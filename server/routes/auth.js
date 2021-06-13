var express = require('express');
var router = express.Router();
const {signup,signout,signin,isSignedIn} = require("../controllers/auth")
const {check, validationResult } = require('express-validator');


router.get("/signout",(req,res)=>{
    res.send("User signed out");
});

router.post("/signup",[
    check("name","name should be atleast 3 characters").isLength({min:3}),
    check("email","email is required").isEmail()
],signup)

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:3})
],signin)

router.get("/signout",signout);



module.exports = router;