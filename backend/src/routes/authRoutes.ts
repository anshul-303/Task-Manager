import express from "express";
import {SignupUser, LoginUser, LogoutUser} from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", SignupUser);
authRouter.post("/login", LoginUser);
authRouter.post("/logout", LogoutUser);


export default authRouter;
