import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
import redis from "../config/cache.js";

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({
      message: "all fields are required!",
    });
  }
  const exUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (exUser) {
    return res.status(400).json({
      message:
        exUser.email === email
          ? "user already exist with this email"
          : "user already exist with this username",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 16);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  return res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username,
      email,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const user = await userModel
    .findOne({
      $or: [{ email }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "invalid credientials",
    });
  }

  const isRightPass = await bcrypt.compare(password, user.password);

  if (!isRightPass) {
    return res.status(401).json({
      message: "invalid credientials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    message: "user login successful",
    user: {
      id: user._id,
      username,
      email,
    },
  });
};

export const getMe = async (req, res) => {
  const userId = req.user;

  const user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({
      message: "user doesnot exist",
    });
  }

  return res.status(200).json({
    message: "user fetched successfully",
    success: !!user,
    user,
  });
};

export const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token missing",
    });
  }

  // await blackListModel.create({
  //   token,
  // });
  await redis.set(token, Date.now().toString(), "EX", 24 * 60 * 60);

  res.clearCookie("token");

  return res.status(201).json({
    message: "user logout successful",
  });
};
