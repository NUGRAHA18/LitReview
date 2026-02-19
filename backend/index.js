import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewre
app.use(cors());
app.use(express.json());

//Check Database Connection Endpoint
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "suscess",
      message: "Server and Database are running",
      db_time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

//basic route
app.get("/", (req, res) => {
  res.send("Welcome to book Review API");
});

app.listen(PORT, (req, res) => {
  console.log(`🚀 Server running on port ${PORT}`);
});
