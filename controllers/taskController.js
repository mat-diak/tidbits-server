const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

// @desc Get tasks
// @route GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  // this req.user.id is accessbile due to the middleware, finds tasks of only the specific user
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

// @desc Create tasks
// @route POST /api/tasks

const createTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let endDate = new Date();
  // makes the date in the future
  req.body.endInDays
    ? endDate.setDate(endDate.getDate() + parseInt(req.body.endInDays))
    : (endDate = null);

  const task = await Task.create({
    text: req.body.text,
    targetReps: req.body.targetReps,
    completedReps: req.body.completedReps,
    user: req.user.id,
    endDate: endDate,
    options: req.body.options,
  });

  res.json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // check for user if its an existing user in our database, if not:
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if the user from our middleware protect, is the same as our task updating user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
});

// @desc Delete task
// @route DELETE /api/tasks
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // check for user if its an existing user in our database
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if the user matches the task. Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await task.remove(req.params.id);

  res.json({ id: req.params.id });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
