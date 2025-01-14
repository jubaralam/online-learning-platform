const express = require("express");
const enrollmentRouter = express.Router();

const mongoose = require("mongoose");

const EnrollmentModel = require("../Models/enrollment.model");

const PaymentModel = require("../Models/payment.model");
const CourseModel = require("../Models/course.model");
const CourseModuleModel = require("../Models/courseModule.model");
// Enrollment with Payment Route
enrollmentRouter.post("/enroll", async (req, res) => {
  const {
    course_Id,
    amount,
    payment_method,
    payment_Id,
    gateway_transaction_Id,
    notes,
  } = req.body;

  console.log("user data", req.user);
  const learner_Id = req.user._id;

  if (!course_Id || !learner_Id || !amount || !payment_method || !payment_Id) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingEnrollment = await EnrollmentModel.findOne({
      course_Id,
      learner_Id,
    });

    if (existingEnrollment) {
      return res
        .status(200)
        .send({ message: "you have already enrolled in this course." });
    }

    // Create Enrollment
    const enrollment = new EnrollmentModel({
      course_Id,
      learner_Id,
      status: "Awaiting Payment",
    });

    const savedEnrollment = await enrollment.save({ session });

    // Create Payment
    const payment = new PaymentModel({
      payment_Id,
      payment_status: "Paid",
      amount,
      payment_method,
      learner_Id,
      enrollment_Id: savedEnrollment._id,
      gateway_transaction_Id,
      notes,
    });

    await payment.save({ session });

    // Update Enrollment Status to Active
    savedEnrollment.status = "Active";
    await savedEnrollment.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Enrollment and payment processed successfully.",
      enrollment: savedEnrollment,
      payment,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
});

// get course by id
enrollmentRouter.get("/course-details/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await CourseModel.findById({ _id: courseId });

    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    res.status(200).send({ data: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// find all modules by course id
enrollmentRouter.get("/get-modules/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const modules = await CourseModuleModel.find({ course_Id: courseId });

    if (!modules) {
      return res.status(404).send({ error: "module not found" });
    }

    res.status(200).send({ data: modules });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get all payment made by the learner
enrollmentRouter.get("/get-payments/:learnerId", async (req, res) => {
  const { learnerId } = req.params;

  try {
    const getPayments = await PaymentModel.find({ learner_Id: learnerId });

    if (getPayments.length <= 0) {
      return res.status(200).send({ message: "No Payment Records found" });
    }

    res.status(200).send({ data: getPayments });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// get a detailed information about a specific payment made by the Learner
enrollmentRouter.get("/payment/:paymentId", async (req, res) => {
  const { paymentId } = req.params;
  const learner_Id = req.user._id;

  try {
    const payment = await PaymentModel.findById({ _id: paymentId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all enrolled courses



enrollmentRouter.get("/get-all-courses", async (req, res) => {
  const {_id} = req.user
  try {
    const courses = await EnrollmentModel.aggregate([
      {
        $match: { learner_Id: _id } // Match the learner_Id
      },
      {
        $lookup: {
          from: "courses", // The 'courses' collection
          localField: "course_Id", // Field in EnrollmentModel
          foreignField: "_id", // Matching field in 'courses' collection
          as: "course_details" // Save the result under this field
        }
      },
      {
        $unwind: "$course_details" // Decompose array to individual objects
      },
      {
        $project: {
          _id: 1, // Exclude the EnrollmentModel _id
          course_Id: 1, // Include the course_Id field
          course_details: 1, // Include the detailed course data
          enrollment_date: 1, // Include additional fields if needed
          progress_percentage: 1,
          learner_Id:1
        }
      }
    ]);
    console.log(courses);
    if(!courses){
      return res.status(404).send({"message":"course not found"})
    }
    res.status(200).send({"data":courses})
  } catch (error) {
    res.status(500).send({"error":error.message})
  }
});




module.exports = enrollmentRouter;
