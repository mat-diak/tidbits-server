const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

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
  const task = await Task.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // find user making request to update and assign as user
  const user = await User.findById(req.user.id);

  // check for user if its an existing user in our database, if not:
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if the user from our middleware protect, is the same as our task updating user
  if (task.user.toString() !== user.id) {
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
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check if the user matches the task. Make sure the logged in user matches the task user
  if (task.user.toString() !== user.id) {
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
