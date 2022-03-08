const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')
const refreshCompletedReps = require('./jobs/refreshCompletedReps') 
const premadeTask = require("./models/premadeTaskModel");

connectDB();


// Jobs
// Deletes completedReps everyday, every 5s for now
refreshCompletedReps()

////////////////////////////////////////////////////////
// CODE FOR SEEDING DATA //

const seedPremadeTasks = [
  {
    text: "Recipe: choice of 5 options",
    targetReps: 1,
    completedReps: 0,
  },
  {
    text: "Read: 3 articles a day",
    targetReps: 3,
    completedReps: 0,
  },
  {
    text: "Dr Says: Drink 8 glasses of water",
    targetReps: 8,
    completedReps: 0,
  },
  {
    text: "Dr Says: Sleep 8 hours a day",
    targetReps: 1,
    completedReps: 0,
  },
];

const addSeedDB = async () => {
  await premadeTask.deleteMany({});
  await premadeTask.insertMany(seedPremadeTasks);
};

addSeedDB();

////////////////////////////////////////////////////////

// initialises express
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/premadetasks", require("./routes/premadeTaskRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

// logs what port is the server running on
app.listen(port, () => console.log(`Server started on port ${port}`));
