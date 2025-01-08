const express = require("express");

const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user.model");

//user registration route
userRouter.post("/register", async (req, res) => {
  const { name, email, phone_no, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.send({ message: "you are already registerd, please login" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ error: err.message });
      }

      const register = UserModel({ name, email, phone_no, password: hash });

      await register.save();
      res.status(201).send({ message: "you have registered" });
    });
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
    const result = bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign({ id: user._id }, process.env.secretKey, {
        expiresIn: "24h",
      });
      res
        .status(201)
        .send({ message: "you have logged in successfully", token: token });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// for updation
userRouter.put("/update/:id", async (req, res) => {
  const { name, email, phone_no } = req.body;
  const {id} = req.params
  try {
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
userRouter.get("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const user = await UserModel.findById({_id:id})
        res.status(201).send({"data":user})
        
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
})


// get all users
userRouter.get("/", async(req, res)=>{
    try {
        const users = await UserModel.find()
        res.status(201).send({"data":users})
        
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
})


// user deletion
userRouter.delete("/remove/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const remove = await UserModel.findByIdAndDelete({_id:id})
        res.send({"message":"your account has been deleted"})
        
    } catch (error) {
        res.status(500).send({"error":error.message})
    }
})


module.exports = userRouter;
