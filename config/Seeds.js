const premadeTask = require("../models/premadeTaskModel");
const connectDB = require("./db");
const dotenv = require("dotenv").config();
const colors = require("colors");

const seedPremadeTasks = [
  {
    text: "Recipe: choice of 5 options",
    targetReps: 1,
    completedReps: 0,
    options: ["array item 4", "array item 5", "array item 6"],
  },
  {
    text: "Read: 3 articles a day",
    targetReps: 3,
    completedReps: 0,
    options: ["read item 1", "read item 2", "read item 3"],
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
