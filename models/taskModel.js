const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    targetReps: {
      type: Number,
      required: [true, "Please add targetReps"],
    },
    completedReps: {
      type: Number,
      required: [true, "Please add completedReps"],
    },
    options: {
      type: [String],
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
