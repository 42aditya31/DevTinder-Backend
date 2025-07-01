const express = require("express");
const app = express();
const connectDatabase = require("./config/database.js"); // Import the database connection
const User = require("./models/user.js"); // Import the User model
require("dotenv").config();
app.use(express.json());

// API to add the user
app.post("/signup", async (req, res) => {
  // console.log(req.body)

  const userObject = req.body;
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
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId;
    try{
         const user = await User.findByIdAndDelete(userId)
         res.send("User delete Successfully !!! ")
        //  const user = await User.findByIdAndDelete({_id:userId}) //You can also use this to delete the document by id 
    }catch (error) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }

})

// UPDATE API
app.patch("/user", async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data)
        res.send("User Updated Successfully!");
    }catch (error) {
    console.error("Error fetching user:", err);
    res.status(500).send("Internal Server Error");
  }

})


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
