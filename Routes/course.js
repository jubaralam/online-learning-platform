const express = require("express");
const courseRouter = express.Router();

const auth = require("../middleware/auth");
const authorizeInstructorOrAdmin = require("../middleware/authorizeInstructorOrAdmin");

const CourseModel = require("../Models/course.model");

courseRouter.post(
  "/create",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
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
    const instructor_id = req.user._id;

    try {
      const course = CourseModel({
        instructor_id,
        poster,
        title,
        description,
        mode,
        language,
        price,
        discount_price,
        total_content,
        course_duration,
      });

      await course.save();
      res.status(200).send({ message: "new course has been added" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//get a course by course id
courseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await CourseModel.findById({ _id: id });
    res.status(201).send({ data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all courses
courseRouter.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).send({ data: courses });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update course
courseRouter.put(
  "/update/:id",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const update = await CourseModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.status(200).send({ message: "course has updated", data: update });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//course deletion
courseRouter.delete(
  "/delete/:id",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
    const { id } = req.params;
    console.log(req.user);
    try {
      const course = await CourseModel.findById({ _id: id });
      if (!course) {
        return res.status(404).send({ message: "course detail not found" });
      }
      const remove = await CourseModel.findByIdAndDelete({ _id: id });

      res.send({ message: "course has been deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = courseRouter;
