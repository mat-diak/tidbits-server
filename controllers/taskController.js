const asyncHandler = require('express-async-handler')

// @desc Get tasks
// @route GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  res.json({ message: "Get tasks..."})
})

// @desc Create tasks
// @route POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  res.json({ message: "Create task..."})
})

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  res.json({ message: `Update task ${req.params.id}`})
})

// @desc Delete task
// @route DELETE /api/tasks
const deleteTask = asyncHandler(async (req, res) => {
  res.json({ message: `Delete task ${req.params.id}`})
})

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}