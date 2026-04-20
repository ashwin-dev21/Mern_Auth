import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";


connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running`)
);