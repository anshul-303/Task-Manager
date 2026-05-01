import { Request, Response } from "express";

export default function verifyJwt(req: Request, res: Response) {
  try {
    console.log("This is the verifyJwt middleware!");
  } catch (error) {
    res.status(500).json({ message: "Error has occured on server side!" });
  }
}
