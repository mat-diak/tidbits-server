const schedule = require('node-schedule')
const Task = require("./taskModel");

const refreshCompletedReps = async () => {
  schedule.scheduleJob('*/5 * * * * *', async () => {
    await Task.updateMany({}, {completedReps: 0})
    console.log(`Cleared tasks completedReps`.magenta.underline)
  })
}

module.exports = refreshCompletedReps;