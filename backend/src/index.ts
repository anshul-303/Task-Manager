import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
dotenv.config();

import authRouter from "./routes/authRoutes";
import handleTaskRouter from "./routes/handleTaskRoutes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "This is a test route!" });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", handleTaskRouter);

app.listen(process.env.PORT || 5000);
