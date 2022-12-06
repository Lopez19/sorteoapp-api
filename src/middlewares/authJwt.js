import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Rol";

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers["x-access-token"];

    // If token is not provided
    if (!token) return res.status(403).json({ message: "No token provided!" });

    // Split token
    const parts = token.split(" ")[1];

    // Verify token
    const decode = jwt.verify(parts, config.SECRET);
    req.userId = decode.id;

    // Verify if user exists
    const user = await User.findById(req.userId, { password: 0 });

    // If user doesn't exists
    if (!user) return res.status(404).json({ message: "User not found!" });

    // Continue with the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

// Function to verify if user is admin
export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  // Verify if user is admin
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  // If user is not admin
  return res.status(403).json({ message: "Require Admin Role!" });
};

// Function to verify if user is moderator
export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  // Verify if user is moderator
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  // If user is not Moderator
  return res.status(403).json({ message: "Require Moderator Role!" });
};
