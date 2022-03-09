const mongoose = require("mongoose");

const premadeTaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
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
      type: Array,
      // required: [true, "Please add Options"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("premadeTask", premadeTaskSchema);
