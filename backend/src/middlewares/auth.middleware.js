import jwt from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
import redis from "../config/cache.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token missing, unauthorized access",
    });
  }

  // const exToken = await blackListModel.findOne({ token });
  const exToken = await redis.get(token);

  if (exToken) {
    return res.status(401).json({
      message: "invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.user = userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};

export default authMiddleware;
