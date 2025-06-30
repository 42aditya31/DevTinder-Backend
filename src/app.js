const express = require('express');

const app = express();

// app.use("/test",(req, res)=>{
//     res.send("Hello from the Test side! This is the Test route. ");
// })
// app.use("/home",(req, res)=>{
//     res.send("Hello from the Home side! This is the Home route.");
// })

// this only call when the user use get method with user route ( to get the information of the user)
app.get("/user", (req,res)=>{
    res.send({firstName:"Aditya", lastName:"Sharma"})
})

// this is only call when the user post method with user route ( to post some details to the DB)
app.post("/user", (req,res)=>{
    // Logic for the Saving dataBase
    res.send("The data is succefully save in the database!!")
})

app.use((req, res)=>{
    res.send("Hello from the Server side! This is the default response.");
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000'
    );  
});