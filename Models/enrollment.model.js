const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema({
  course_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  learner_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Completed", "Pending", "Cancelled", "Awaiting Payment", "Awaiting Approval"],
  },
  enrollment_date: { 
    type: Date, 
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= Date.now();
      },
      message: "Enrollment date cannot be in the future."
    }
  },
  completion_date: { type: Date },
  progress_percentage: { type: Number, default: 0 },
  last_accessed: { type: Date }
});

// Indexes                                                                                                                                                                                                                                                                                                       
enrollmentSchema.index({ course_Id: 1, learner_Id: 1 }, { unique: true });

const EnrollmentModel = mongoose.model("enrollment", enrollmentSchema);

module.exports = EnrollmentModel;
