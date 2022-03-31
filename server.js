const dotenv = require("dotenv").config();
const colors = require("colors");
const mongoDB = require("./config/db");
const port = process.env.PORT || 5000;
const app = require('./app')

mongoDB.connect();

// logs what port is the server running on
app.listen(port, () => console.log(`Server started on port ${port}`));
