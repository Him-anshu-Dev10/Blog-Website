import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import transporter from "../configs/nodemailer.js";

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      return res.json({
        success: false,
        message: "No account found with this email",
      });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store in DB - expires in 15 minutes
    admin.resetToken = hashedToken;
    admin.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await admin.save();

    // Build reset URL
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

    // Send email
    const mailOptions = {
      from: `"QuickBlog Admin" <${process.env.SMTP_EMAIL}>`,
      to: admin.email,
      subject: "Password Reset Request - QuickBlog",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 16px;">
          <div style="background: rgba(255,255,255,0.95); border-radius: 12px; padding: 40px; text-align: center;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 14px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 28px; font-weight: bold;">Q</span>
            </div>
            <h1 style="color: #1f2937; margin-bottom: 10px; font-size: 24px;">Password Reset</h1>
            <p style="color: #6b7280; margin-bottom: 30px; line-height: 1.6;">
              You requested a password reset for your QuickBlog admin account. Click the button below to set a new password.
            </p>
            <a href="${resetUrl}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px;">
              Reset Password
            </a>
            <p style="color: #9ca3af; margin-top: 30px; font-size: 13px; line-height: 1.5;">
              This link will expire in <strong>15 minutes</strong>.<br/>
              If you didn't request this, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />
            <p style="color: #d1d5db; font-size: 11px;">QuickBlog &copy; 2026</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.json({
      success: false,
      message: "Failed to send reset email. Please try again.",
    });
  }
};

// POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords do not match" });
    }

    // Hash the token from URL to compare with DB
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
      resetToken: hashedToken,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password & clear reset token
    admin.password = hashedPassword;
    admin.resetToken = null;
    admin.resetTokenExpire = null;
    await admin.save();

    res.json({
      success: true,
      message: "Password reset successfully! You can now login.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.json({
      success: false,
      message: "Failed to reset password. Please try again.",
    });
  }
};
