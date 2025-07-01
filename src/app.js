const express = require("express");
const app = express();
const connectDatabase = require("./config/database.js"); // Import the database connection
require("dotenv").config();

connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
