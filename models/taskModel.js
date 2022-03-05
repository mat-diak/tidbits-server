const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a text value']
  },
  targetReps: {
    type: Number,
    required: [true, 'Please add targetReps']
  },
  completedReps: {
    type: Number,
    required: [true, 'Please add completedReps']
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema)