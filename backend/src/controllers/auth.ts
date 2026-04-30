import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import db from "../config/db";
import jwt from "jsonwebtoken";
import { User } from "../types/types";

export async function SignupUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      res.status(400).json({ message: "Email and password required!" });
      return;
    }
    // console.log(email, password);
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT id from users where email=?;",
      [email],
    );
    if (rows.length === 0) {
      const newid: string = uuidv4();
      const hashedPassword: string = await bcrypt.hash(password, 10);
      await db.execute(
        `INSERT INTO users (id, email, password)
      VALUES
      (?, ?, ?);`,
        [newid, email, hashedPassword],
      );

      const [newrows] = await db.execute<RowDataPacket[]>(
        "SELECT * from users where email=?;",
        [email],
      );
      console.log(newrows);
    }
    res.status(200).json({ message: "The user is successfully signed up!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function LoginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    console.log(email, password);

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    const [row] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM users WHERE email=?;",
      [email],
    );

    if (row.length === 0) {
      res
        .status(404)
        .json({ message: "User doesn't exist with current email!" });
      return;
    } else if (row.length > 1) {
      res.status(404).json({ message: "Multiple users! Error occured!" });
      return;
    }

    const foundUser = row[0];
    const secret = process.env.JWT_SECRET as string;
    const user: User = {
      id: foundUser.id,
      email: foundUser.email,
    };
    const accessToken = jwt.sign(user, secret, { expiresIn: "1h" });
    res
      .cookie("accessToken", accessToken, {
        httpOnly: process.env.COOKIE_HTTP_ONLY ==="true",
        secure: process.env.HTTP_SECURE ==="true",
        sameSite: "lax",
        maxAge: 3600 * 1000,
      })
      .status(200)
      .json({ message: "The user is successfully logged in!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
