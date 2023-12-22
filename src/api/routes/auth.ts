// auth.ts
import express from "express";
import User from "../../db/models/user";
import mongoose, { mongo } from "mongoose";
import { DB_NAME, DB_PASSWORD } from "../env";
const authRouter = express.Router();

// bettercanvas
mongoose
  .connect(
    `mongodb+srv://bettercanvas-admin:${DB_PASSWORD}@bettercanvas-cluster.bc9himm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

authRouter.post("/register", async (req, res) => {
  try {
    const { apiToken, pinCode, name, email } = req.body;

    // Check if required fields are provided
    if (!apiToken || !pinCode) {
      return res
        .status(400)
        .json({ error: "apiToken and pinCode are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ apiToken });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this apiToken already exists" });
    }

    // Create a new user in the database
    const user = new User({ apiToken, pinCode, name, email });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

// Authenticate a user
authRouter.post("/authenticate", async (req, res) => {
  try {
    const { email, pinCode } = req.body;

    // Find a user by PIN code
    const user = await User.findOne({ email, pinCode });

    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
    } else {
      res.json({ message: "Authentication successful", user });
    }
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "An error occurred during authentication" });
  }
});

export default authRouter;
