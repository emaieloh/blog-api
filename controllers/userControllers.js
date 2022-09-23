import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201);
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

export { registerUser, loginUser };
