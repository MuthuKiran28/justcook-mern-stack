import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import recipesRoutes from "./routes/recipes.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---- CORS configuration ----
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin:
      allowedOrigins.length > 0
        ? (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
          }
        : true,
  })
);

// ---- Security headers ----
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-XSS-Protection", "0");
  next();
});

// ---- JSON body parser ----
app.use(express.json({ limit: "100kb" }));
app.use("/uploads", express.static("uploads"));

// ---- API routes ----
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);

//----upload images----
app.use("/uploads", express.static("uploads"));

// ---- Serve frontend in production ----


// ---- Start server ----
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`MongoDB connected`);
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();