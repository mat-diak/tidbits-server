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

  const goal = await Task.create({
    text: req.body.text
  })

  res.json(goal)
})

// @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id)

  if(!task) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const updatedGoal = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.json(updatedGoal)
})

// @desc Delete task
// @route DELETE /api/tasks
const deleteTask = asyncHandler(async (req, res) => {

  const task = await Task.findById(req.params.id)

  if(!task) {
    res.status(400)
    throw new Error('Goal not found')
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