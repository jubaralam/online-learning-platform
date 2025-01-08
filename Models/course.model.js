const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  instructor_id: { type: mongoose.Schema.Types.ObjectId, ref:"user" },
  poster: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  mode: { type: String, required: true },
  language: { type: String, required: true },

  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  total_content: { type: Number, required: true },
  course_duration: { type: Number, required: true },
});



const CourseModel = mongoose.model("course", courseSchema)

module.exports = CourseModel