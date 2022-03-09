const asyncHandler = require("express-async-handler");
const axios = require('axios');
const Task = require("../models/taskModel");

// @desc Get tasks
// @route GET /api/premadetasks
const getRecipes = asyncHandler(async (req, res) => {
  const response = await axios.get(process.env.RECIPE_API)

  // console.log(response.data.hits[0].recipe.url)

  const getFiveRecipes = () => {
    return response.data.hits
      .slice(0, 5)
      .map((data) => data.recipe.url)
  }

  const task = await Task.create({
    text: req.body.text,
    targetReps: req.body.targetReps,
    completedReps: req.body.completedReps,
    user: req.user.id,
    options: getFiveRecipes()
  });


  res.status(200).json(task);
});

module.exports = {
  getRecipes,
};
