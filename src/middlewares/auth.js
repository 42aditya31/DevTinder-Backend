const adminAuth = (req,res,next)=>{
     const token = "xyz"; // req.body?.token
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
         res.status(401).send("Unauthorized request !!");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
     const token = "xy5"; // req.body?.token
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
         res.status(401).send("Unauthorized request !!");
    }
    else{
        next();
    }
}

module.exports ={
    adminAuth,
    userAuth
}