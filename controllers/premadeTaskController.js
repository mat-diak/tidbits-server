const asyncHandler = require("express-async-handler");

const premadeTask = require("../models/premadeTaskModel");

// @desc Get tasks
// @route GET /api/premadetasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await premadeTask.find();
  res.status(200).json(tasks);
});

module.exports = {
  getTasks,
};
