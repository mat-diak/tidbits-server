const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const app = require('./app')

connectDB(process.env.MONGO_URI);

// logs what port is the server running on
app.listen(port, () => console.log(`Server started on port ${port}`));
