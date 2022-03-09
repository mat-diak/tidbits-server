const express = require("express");
const router = express.Router();
const { getRecipes } = require("../controllers/recipeController");

// const { protect } = require("../middleware/authMiddleware");

const { protect } = require("../middleware/authMiddleware");

// add protect before every route to protect it
router.post("/", protect, getRecipes);

module.exports = router;
