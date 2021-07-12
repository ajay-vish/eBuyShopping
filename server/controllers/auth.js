const User = require("../models/user");
const {validationResult } = require('express-validator');
var jwt = require('jsonwebtoken'); 
var expressJwt = require('express-jwt');

exports.signup =(req,res)=>{

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){

        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    
    //a simple if/else to check if email already exists in db
            User.findOne({ email: req.body.email }, function(err, user) {
                if(err) {
                //handle error here
                return res.status(400).json({
                    error: err
                })
                }
            
                //if a user was found, that means the user's email matches the entered email
                if (user) {
                    return res.status(400).json({
                        error: "Email already exists"
                    })
                } else {
                    //code if no user with entered email was found
              

                    const user = new User(req.body)
                    user.save((err,user)=>{
                        if(err){
                            return res.status(400).json({
                                error: "NOT able to save user in db"
                            })
                        }

                        res.json({ success:true, message:"Signup successfull"})
                        // res.json(user);
                    })


                    }
             }); 
}


exports.signin = (req,res)=>{
    const {email,password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){

        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User email does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie 
        res.cookie("token", token,{expire: new Date()+ 9999})

        //send response to front-end
        const {_id,name,email,role} = user;
        return res.json({success:true,token,user:{_id,name,email,role}});

    })
}

exports.signout =(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"User signedout successfully"
    })
}

//protected routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty :"auth"
});

//custom middlewares
exports.isAuthenticated =(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error:"Access denied"
        });
    }
    next();
}

exports.isAdmin =(req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not an Admin,acces denied "
        })
    }
    next();
}