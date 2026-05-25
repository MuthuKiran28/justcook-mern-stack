import express from "express";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authAttempts = new Map();

const AUTH_WINDOW_MS = 15 * 60 * 1000;

const AUTH_MAX_ATTEMPTS = 25;

// Rate Limiter
const authRateLimit = (req, res, next) => {
  const key = req.ip || "unknown";

  const now = Date.now();

  const record = authAttempts.get(key) || {
    count: 0,
    resetAt: now + AUTH_WINDOW_MS,
  };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + AUTH_WINDOW_MS;
  }

  record.count += 1;

  authAttempts.set(key, record);

  if (record.count > AUTH_MAX_ATTEMPTS) {
    return res.status(429).json({
      message:
        "Too many authentication attempts. Please try again later.",
    });
  }

  return next();
};

const isValidPassword = (password) =>
  typeof password === "string" && password.length >= 8;

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// Register
router.post("/register", authRateLimit, async (req, res) => {
  const username = (req.body.username || "").trim();

  const email = (req.body.email || "")
    .trim()
    .toLowerCase();

  const password = req.body.password;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Login
router.post("/login", authRateLimit, async (req, res) => {
  const email = (req.body.email || "")
    .trim()
    .toLowerCase();

  const password = req.body.password;

  try {
    if (!EMAIL_REGEX.test(email) || typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Current User
router.get("/me", protect, async (req, res) => {
  return res.status(200).json(req.user);
});

// Add Favorite
router.post("/favorites/:recipeId", protect, async (req, res) => {
  console.log("Favorite route hit");

  try {
    const user = await User.findById(req.user._id);

    // Initialize favorites if missing
    if (!user.favorites) {
      user.favorites = [];
    }

    const recipeId = req.params.recipeId;

    const alreadyFavorite = user.favorites.some(
      (fav) => fav.toString() === recipeId
    );

    if (!alreadyFavorite) {
      user.favorites.push(recipeId);

      await user.save();
    }

    const updatedUser = await User.findById(
      req.user._id
    ).populate("favorites");

    console.log(
      "Favorites Updated:",
      updatedUser.favorites
    );

    return res.json(updatedUser.favorites);
  } catch (error) {
    console.error("Favorite Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Remove Favorite
router.delete("/favorites/:recipeId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== req.params.recipeId
    );

    await user.save();

    const updatedUser = await User.findById(
      req.user._id
    ).populate("favorites");

    return res.json(updatedUser.favorites);
  } catch (error) {
    console.error("Remove Favorite Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Get Favorites
router.get("/favorites", protect, async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate("favorites");

    if (!user.favorites) {
      user.favorites = [];
    }

    return res.json(user.favorites);
  } catch (error) {
    console.error("Get Favorites Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;