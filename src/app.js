const express = require("express");
const app = express();
const connectDatabase = require("./config/database.js"); // Import the database connection
const User = require("./models/user.js"); // Import the User model
require("dotenv").config();
app.use(express.json());

// API to add the user
// app.post("/signup", async (req, res) => {
//   // console.log(req.body)
//   const userObject = req.body;
//   // Create a new user instance
//   // and save it to the database
//   const user = new User(userObject);
//   try {
//     await user.save();
//     res.send("User created successfully");
//   } catch (err) {
//     console.error("Error creating user:", err);
//     res.status(500).json({
//       success: false,
//       error: err.message || "Internal Server Error",
//     });
//   }
// });


app.post("/signup", async (req, res) => {
  const userObject = req.body;

  try {
    // 1️⃣ Check if the email is already in use
    const existingUser = await User.findOne({ email: userObject.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email is already registered. Please use a different one.",
      });
    }

    // 2️⃣ Create new user if email doesn't exist
    const user = new User(userObject);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  }
});



//API to get the user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send(" User not Found ");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// API to get all Users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send(" User not Found ");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User delete Successfully !!! ");
    //  const user = await User.findByIdAndDelete({_id:userId}) //You can also use this to delete the document by id
  } catch (error) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE API
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      res.status(400).send("Update is not allowed !!");
    }
    // if (data?.skills.length > 10){
    //   throw new Error("You can not add more than 10 skills")
    // }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    // console.log(user);
    res.send("User Updated Successfully!");
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
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
