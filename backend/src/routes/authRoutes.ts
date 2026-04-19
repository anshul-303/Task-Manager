import express from "express";
import SignupUser from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", SignupUser);
export default authRouter;
