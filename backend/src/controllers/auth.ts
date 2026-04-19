import { Request, Response } from "express";

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
    console.log(email, password);
    res.status(200).json({ message: "The user is successfully signed up!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
