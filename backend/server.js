// import express from "express"
// import mongoose from "mongoose"
// import dotenv from "dotenv"
// import cors from "cors"
// import authRoutes from "./routes/authRoutes.js"
// import jobRoutes from './routes/jobRoutes.js'

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth",authRoutes);
// app.use("/api/job",jobRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//     app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// })
// .catch((err) => console.log("MongoDB connection error:", err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();

// ✅ Correct CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobtracko.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

// ✅ MongoDB + Start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));
