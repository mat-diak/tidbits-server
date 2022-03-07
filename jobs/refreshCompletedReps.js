const schedule = require('node-schedule')
const Task = require("../models/taskModel");

const refreshCompletedReps = async () => {
  schedule.scheduleJob('*/10 * * * * *', async () => {
    // get all tasks completed reps
    // add them to history array
    await Task.updateMany({}, {completedReps: 0})

    console.log(`Job completed: cleared tasks completedReps`.magenta.underline)
  })
}

module.exports = refreshCompletedReps;
