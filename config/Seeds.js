const premadeTask = require("../models/premadeTaskModel");
const connectDB = require("./db");
const dotenv = require("dotenv").config();
const colors = require("colors");

const seedPremadeTasks = [
  {
    text: "News: Read 3 articles",
    targetReps: 3,
    completedReps: 0,
    options: [{
      name: "‘History can be funny’: Muscovites get used to life without Dior and McDonald’s",
      url: 'https://www.theguardian.com/world/2022/mar/09/history-can-be-funny-muscovites-get-used-to-life-without-dior-and-mcdonalds',
    }, {
      name: "Ukraine war piles pressure on global food system already in crisis",
      url: 'https://www.theguardian.com/food/2022/mar/09/ukraine-war-piles-pressure-on-global-food-system-already-in-crisis',
    },
    {
      name: "‘Bob Marley turned up in a bad mood’ – Esther Anderson’s best photograph",
      url: 'https://www.theguardian.com/artanddesign/2022/mar/09/bob-marley-bad-mood-esther-andersons-best-photograph',
    },
  ]
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
