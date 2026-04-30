import express from "express";
import {SignupUser, LoginUser} from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", SignupUser);
authRouter.post("/login", LoginUser);

export default authRouter;
