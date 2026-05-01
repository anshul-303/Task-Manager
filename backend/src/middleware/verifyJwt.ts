import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import { HandleTaskRequest } from "../types/types";

dotenv.config();

export default function verifyJwt(
  req: Request, //The request here is arriving without userInfo in it.
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(401).json({ message: "Access Denied: No Token Provided" });
      return;
    }
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    ) as {
      id: number;
      email: string;
    };
    (req as HandleTaskRequest).userInfo = decoded; //Delibrately mentioning type here
    next();
  } catch (error) {
    console.log("Error occured : ", error);
    res.status(500).json({ message: "Error has occured on server side!" });
    return;
  }
}
