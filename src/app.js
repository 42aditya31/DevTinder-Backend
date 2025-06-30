// const express = require('express');
// const app = express();
// const { adminAuth } = require('./middlewares/auth.js');
// const { userAuth } = require('./middlewares/auth.js')

// // Handle Auth middleware  for any method 
// app.use("/admin",adminAuth)

// app.get("/admin/alldata",(req,res)=>{
//     const token = "xyz"; // req.body?.token
//     const isAdminAuthorized = token === "xyz";
//     if(isAdminAuthorized){
//         res.send("All the userData")
//     }
//     else{
//         res.status(401).send("Unauthorized request !!");
//     }
// })

// app.use("/", (req, res, next) => {
//     // res.send("Handling the / routing ");
//     next();
// });

// // app.use("/user", userAuth) we can do like this and also like the below 

// app.get("/user",userAuth, 
// (req, res, next) => {
//     // res.send("Handling the /user routing ");
//     next();
// },
// (req, res, next) => {
//     // res.send("Handling the /user routing2 ");
//     next();
// },
// (req, res, next) => {
//     res.send("Handling the /user routing3 ");
//     next();
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


const express = require('express');
const app = express();
const { adminAuth } = require('./middlewares/auth.js');
const { userAuth } = require('./middlewares/auth.js');

app.use(express.json());

// Admin routes with auth middleware
app.use("/admin", adminAuth);

app.get("/admin/alldata", (req, res, next) => {
    try {
        const token = "xyz"; // Normally this should come from req.headers / req.body
        const isAdminAuthorized = token === "xyz";
        if (isAdminAuthorized) {
            res.send("All the userData");
        } else {
            const error = new Error("Unauthorized request !!");
            error.status = 401;
            throw error;
        }
    } catch (err) {
        next(err); // Forward error to the centralized error handler
    }
});

// General middleware for root
app.use("/", (req, res, next) => {
    next();
});

// User route with middleware + handlers
app.get("/user", userAuth,
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        try {
            res.send("Handling the /user routing3");
        } catch (err) {
            next(err);
        }
    }
);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

