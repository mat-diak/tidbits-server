const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')

// @desc Get tasks
// @route GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()

  res.json(tasks)
})

// @desc Create tasks
// @route POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const task = await Task.create({
    text: req.body.text,
    targetReps: req.body.targetReps,
    completedReps: req.body.completedReps
  })

  res.json(task)
})

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id)

  if(!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.json(updatedTask)
})

// @desc Delete task
// @route DELETE /api/tasks
const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id)

  if(!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  await task.remove(req.params.id)

  res.json({ id: req.params.id })
})

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
}