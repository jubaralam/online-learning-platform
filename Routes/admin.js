const express = require("express");
const mongoose = require("mongoose");
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
const enrollmentRouter = require("./enrollment");

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
    res.status(200).send({ message: "course has been deleted", data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all enrollments
adminRouter.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await EnrollmentModel.find();
    if (!enrollments) {
      return res.status(404).send({ message: "enrollment detail not found" });
    }

    res.status(200).send({ data: enrollments });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get a enrollment details
adminRouter.get("/enrollment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const enrollments = await EnrollmentModel.findById({ _id: id });
    if (!enrollments) {
      return res.status(404).send({ message: "enrollment detail not found" });
    }

    res.status(200).send({ data: enrollments });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

adminRouter.put("/enrollment/update/:id", async (req, res) => {
  const { id } = req.params;
  const { learner_Id, status, course_Id, progress_percentage } = req.body;
  try {
    const data = {};

    if (learner_Id) data.learner_Id = learner_Id;
    if (status) data.status = status;
    if (course_Id) data.course_Id = course_Id;
    if (progress_percentage) data.progress_percentage = progress_percentage;

    const enrollments = await EnrollmentModel.findByIdAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    if (!enrollments) {
      return res.status(404).send({ message: "enrollment detail not found" });
    }

    res.status(200).send({
      message: "enrollment has successfully updated",
      data: enrollments,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

adminRouter.delete("/enrollment/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const enrollments = await EnrollmentModel.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    if (!enrollments) {
      return res.status(404).send({ message: "enrollment detail not found" });
    }

    res.status(200).send({
      message: "enrollment detail has been deleted",
      data: enrollments,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all payments details
adminRouter.get("/payment/details/", async (req, res) => {
  //   const { learner_Id } = req.params;
  try {
    const paymentDetail = await PaymentModel.aggregate([
      {
        $lookup: {
          from: "enrollments",
          localField: "enrollment_Id",
          foreignField: "_id",
          as: "payment_details",
        },
      },
      {
        $unwind: "$payment_details",
      },
      {
        $lookup: {
          from: "users",
          localField: "learner_Id",
          foreignField: "_id",
          as: "user_detail",
        },
      },
      {
        $unwind: "$user_detail",
      },
    ]);
    if (paymentDetail.length <= 0) {
      return res.status(404).send({ message: "payment detail not found" });
    }
    res.status(200).send({ data: paymentDetail });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all payment of a learner
adminRouter.get("/payment/learner-details/:learner_Id", async (req, res) => {
  const { learner_Id } = req.params;

  try {
    const paymentDetail = await PaymentModel.aggregate([
      {
        $match: { learner_Id: new mongoose.Types.ObjectId(learner_Id) },
      },
      {
        $lookup: {
          from: "enrollments",
          localField: "enrollment_Id",
          foreignField: "_id",
          as: "enrollment_details",
        },
      },
      {
        $unwind: "$enrollment_details",
      },
      {
        $lookup: {
          from: "users",
          localField: "learner_Id",
          foreignField: "_id",
          as: "user_detail",
        },
      },
      {
        $unwind: "$user_detail",
      },
    ]);

    if (paymentDetail.length <= 0) {
      return res
        .status(404)
        .send({
          message: "Payment detail not found for the specified learner",
        });
    }

    res.status(200).send({ data: paymentDetail });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



//get a payment detail by payment id
adminRouter.get("/payment/learner-detail/:paymentId", async (req, res) => {
    const { paymentId } = req.params;
  
    try {
      const paymentDetail = await PaymentModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(paymentId) },
        },
        {
          $lookup: {
            from: "enrollments",
            localField: "enrollment_Id",
            foreignField: "_id",
            as: "enrollment_details",
          },
        },
        {
          $unwind: "$enrollment_details",
        },
        {
          $lookup: {
            from: "users",
            localField: "learner_Id",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $unwind: "$user_detail",
        },
      ]);
  
      if (paymentDetail.length <= 0) {
        return res
          .status(404)
          .send({
            message: "Payment detail not found for the specified learner",
          });
      }

      
  
      res.status(200).send({ data: paymentDetail });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });



module.exports = adminRouter;
