// Run this once to seed the admin user into MongoDB
// Usage: node seedAdmin.js

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists, updating password...");
      const salt = await bcrypt.genSalt(12);
      existingAdmin.password = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        salt,
      );
      await existingAdmin.save();
      console.log("Admin password updated!");
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        salt,
      );

      await Admin.create({
        email: process.env.ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
      });
      console.log("Admin user created!");
    }

    console.log(`Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();
