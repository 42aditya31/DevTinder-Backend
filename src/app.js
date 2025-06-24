const express = require('express');

const app = express();

app.use("/test",(req, res)=>{
    res.send("Hello from the Test side! This is the Test route. ");
})
app.use("/home",(req, res)=>{
    res.send("Hello from the Home side! This is the Home route.");
})
app.use((req, res)=>{
    res.send("Hello from the Server side! This is the default response.");
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000'
    );  
});