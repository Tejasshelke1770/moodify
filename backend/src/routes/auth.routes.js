import express from "express";
import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/logout", logoutUser);

authRouter.get("/get-me", authMiddleware, getMe);

export default authRouter;
