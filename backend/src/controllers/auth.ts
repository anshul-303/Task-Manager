import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import db from "../config/db";

export default async function SignupUser(
  req: Request,
  res: Response,
): Promise<void> {
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
