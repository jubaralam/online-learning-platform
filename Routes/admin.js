const express = require("express");

const adminRouter = express.Router();
// course model
const CourseModel = require("../Models/course.model");

//course module model
const CourseModuleModel = require("../Models/courseModule.model");

// enrollment model
const EnrollmentModel = require("../Models/enrollment.model");
// Payment model
const PaymentModel = require("../Models/payment.model");

// User model
const UserModel = require("../Models/user.model");

//get user by user id
adminRouter.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//update user details
adminRouter.put("/user/update/:id", async (req, res) => {
  const {
    name,
    email,
    phone_no,
    age,
    dob,
    gender,
    profile_picture,
    city,
    highest_qualification,
    preferred_language,
    learning_goals,
    role,
  } = req.body;
  const { id } = req.params;
  try {
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (phone_no) data.phone_no = phone_no;
    if (age) data.age = age;
    if (dob) data.dob = dob;
    if (gender) data.gender = gender;
    if (profile_picture) data.profile_picture = profile_picture;
    if (city) data.city = city;
    if (highest_qualification)
      data.highest_qualification = highest_qualification;
    if (preferred_language) data.preferred_language = preferred_language;
    if (learning_goals) data.learning_goals = learning_goals;
    if (role) data.role = role;
    const user = await UserModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all users
adminRouter.get("/users", async (req, res) => {
  const { role } = req.user;
  try {
    if (role != "admin") {
      return res.status(403).send({ message: "you are not authorized" });
    }
    const users = await UserModel.aggregate([
      {
        $match: {
          role: "learner",
        },
      },
    ]);
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//delete user by id
adminRouter.delete("/user/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const remove = await UserModel.findByIdAndDelete(
      { _id: id },
      { new: true }
    );

    if (!remove) {
      return res.status(404).send({ message: "user not found" });
    }

    res.status(200).send({ data: remove });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all users
adminRouter.get("/instructors", async (req, res) => {
  const { role } = req.user;
  try {
    const instructoe = await UserModel.aggregate([
      {
        $match: {
          role: "instructor",
        },
      },
    ]);
    if (!instructoe) {
      return res.status(404).send({ message: "instructor not found" });
    }
    res.status(200).send({ data: instructoe });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all courses
adminRouter.get("/courses", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    if (!courses) {
      return res.status(404).send({ message: "course not found" });
    }
    res.status(200).send({ data: courses });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get specific course details
adminRouter.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CourseModel.findById({ _id: id });
    if (!course) {
      return res.status(404).send({ message: "course not found" });
    }
    res.status(200).send({ data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//update specific course by id
adminRouter.put("/course/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    poster,
    title,
    description,
    mode,
    language,
    price,
    discount_price,
    total_content,
    course_duration,
  } = req.body;
  try {
    const data = {};

    if (poster) data.poster = poster;
    if (title) data.title = title;
    if (description) data.description = description;
    if (mode) data.mode = mode;
    if (language) data.language = language;
    if (price) data.price = price;
    if (discount_price) data.discount_price = discount_price;
    if (total_content) data.total_content = total_content;
    if (course_duration) data.course_duration = course_duration;

    const course = await CourseModel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!course) {
      return res.status(404).send({ message: "course not found" });
    }
    res.status(200).send({ message: "course has been updated", data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


//delete a specific course
adminRouter.delete("/course/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CourseModel.findByIdAndDelete({ _id: id });
    if (!course) {
      return res.status(404).send({ message: "course not found" });
    }
    res.status(200).send({message:"course has been deleted", data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});







module.exports = adminRouter;
