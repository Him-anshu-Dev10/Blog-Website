import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./configs/Db.js";
import adminRouter from "./Routes/adminRoutes.js";
import blogRouter from "./Routes/blogRoutes.js";
import authRouter from "./Routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/auth", authRouter);

await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
