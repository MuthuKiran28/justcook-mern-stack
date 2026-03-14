import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import recipesRoutes from "./routes/recipes.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();
<<<<<<< HEAD

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
=======
const PORT = process.env.PORT || 5000;

const app = express();

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

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-XSS-Protection", "0");
  next();
});

app.use(express.json({ limit: "100kb" }));
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
<<<<<<< HEAD
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at port ${PORT}`);
});
=======
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
>>>>>>> de2c54712568ec9c477c5bbf1053bb72c9244c21
