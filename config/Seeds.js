const premadeTask = require("../models/premadeTaskModel");
const connectDB = require("./db");
const dotenv = require("dotenv").config();
const colors = require("colors");

const seedPremadeTasks = [
  {
    text: "Recipe: choice of 5 options",
    targetReps: 1,
    completedReps: 0,
    options: {
      name: 'Hello',
      url: 'blep'
    },
  },
  {
    text: "Read: 3 articles a day",
    targetReps: 3,
    completedReps: 0,
    options: {
      name: 'Hello',
      url: 'blep'
    },
  },
  {
    text: "Dr Says: Drink 8 glasses of water",
    targetReps: 8,
    completedReps: 0,
  },
];

const addSeedDB = async () => {
  await premadeTask.deleteMany({});
  await premadeTask.insertMany(seedPremadeTasks);
};

module.exports = addSeedDB;
