const express = require("express");
const router = express.Router();
const { getTasks } = require("../controllers/premadeTaskController");

const { protect } = require("../middleware/authMiddleware");

// add protect before every route to protect it
router.get("/", protect, getTasks);

module.exports = router;
