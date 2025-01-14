const express = require("express");

const userRouter = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");

const auth = require("../middleware/auth");
const authorizeInstructorOrAdmin = require("../middleware/authorizeInstructorOrAdmin");

//user registration route
userRouter.post("/register", async (req, res) => {
  const { name, email, phone_no, password } = req.body;
  try {
    if (!name || !email || !phone_no || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.send({ message: "you are already registerd, please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);

    const register = UserModel({
      name,
      email,
      phone_no,
      password: hashedPassword,
    });

    await register.save();
    res.status(201).send({ message: "you have registered", success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//user login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.send({ message: "email not found" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.secretKey,
        {
          expiresIn: "24h",
        }
      );
      res.status(201)
        .send({ message: "you have logged in successfully", token: token });
    }else{
      res.send({"messasge":"Incorrect password"})
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// for updation
userRouter.put("/update/:id", auth, async (req, res) => {
  const { name, email, phone_no } = req.body;
  const { id } = req.params;
  try {
    if (req.user._id !== id || req.user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden" });
    }
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone_no) data.phone_no = phone_no;
    const update = await UserModel.findByIdAndUpdate(id, data, { new: true });
    res.status(201).send({ message: "your profile has updated", data: update });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// find a single user by id
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(201).send({ data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all users
userRouter.get("/", [auth, authorizeInstructorOrAdmin], async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(201).send({ data: users });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// user deletion
userRouter.delete("/remove/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const remove = await UserModel.findByIdAndDelete({ _id: id });
    res.send({ message: "your account has been deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = userRouter;
