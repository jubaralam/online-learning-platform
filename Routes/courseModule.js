const express = require("express");
const courseModuleRouter = express.Router();

const CourseModuleModel = require("../Models/courseModule.model");

const auth = require("../middleware/auth");
const authorizeInstructorOrAdmin = require("../middleware/authorizeInstructorOrAdmin");

courseModuleRouter.post(
  "/create",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
    const { course_Id, title, content, video_link } = req.body;
    const instructor_Id = req.user._id;
    try {
      if (!course_Id || !title || !content || !video_link) {
        return res.status(404).send({ message: "All fields are required" });
      }

      const courseModule = CourseModuleModel({
        course_Id,
        title,
        content,
        video_link,
        instructor_Id,
      });

      await courseModule.save();
      res.status(201).send({ message: "course content has been created" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

//find all module releted to a course by course_Id
courseModuleRouter.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const modules = await CourseModuleModel.find({ course_Id: courseId });
    if (modules.length == 0) {
      return res.status(404).send({ message: "module not found" });
    }
    res.status(200).send({ data: modules });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// update module
courseModuleRouter.put(
  "/update/:moduleId",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
    const {  title, content, video_link } = req.body;
    const { moduleId } = req.params;
    const { _id } = req.user;
    try {
      const data = {}
      if(title){data.title = title}
      if(content){data.content = content}
      if(video_link){data.video_link = video_link}
      const module = await CourseModuleModel.findById(moduleId);
      console.log(module.instructor_Id);
      if (module.instructor_Id.toString() !== _id.toString()) {
        return res.status(403).send({ message: "you are not authorized" });
      }
      const update = await CourseModuleModel.findByIdAndUpdate(
        moduleId,
        data,
        { new: true }
      );

      if (!update) {
        return res.status(404).send({ message: "something went wrong" });
      }

      res.status(200).send({ message: "module has updated", data: update });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

// delete module
courseModuleRouter.delete(
  "/delete/:moduleId",
  [auth, authorizeInstructorOrAdmin],
  async (req, res) => {
    const { moduleId } = req.params;
    const { _id } = req.user;

    try {
      const module = await CourseModuleModel.findById(moduleId);
      console.log(module.instructor_Id);
      if (module.instructor_Id.toString() !== _id.toString()) {
        return res.status(403).send({ message: "you are not authorized" });
      }

      const remove = await CourseModuleModel.findByIdAndDelete(
       moduleId ,
        { new: true }
      );
      if (!remove) {
        res.status(404).send({ message: "something went wrong" });
      }
      res.status(204).send({ message: "module has been deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

module.exports = courseModuleRouter;
