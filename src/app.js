const express = require("express");
const app = express();
const connectDatabase = require("./config/database.js"); // Import the database connection
const User = require("./models/user.js"); // Import the User model
require("dotenv").config();

app.post("/signup", async (req, res) => {
  const userObject = {
    firstName: "Nandan",
    lastName: "Jogi",
    email: "nandan@007gmail.com",
    password: "Nandan@000",
  };
  // Create a new user instance
  // and save it to the database
  const user = new User(userObject);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal Server Error");
  }
});

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
