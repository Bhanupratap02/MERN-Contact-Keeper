const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Error = require("../middlewares/error")
//@desc     Get logged in user 
//@route    Get  /api/auth
//@access   Private
exports.loggedInUser = async (req,res) =>{
 try {
     const user = await User.findById(req.user.id);
     res.status(201).json(user);
 } catch (error) {
     res.status(500).json(Error("Something went wrong in geting logged in user,please try again"));
 }
}

//@desc      Auth user and get token or log in your account
//@route     post   /api/auth
//@access    Public
exports.Login = async (req,res) =>{
    try {  

    const   {email , password} = req.body
    // validate email and password
    if(!email || !password ){
        return res.status(400).json({
        msg:"Please provide an email and password "
        });
    }

        let user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({msg:"User doesn't exits"});
        }
        const isMatch  = await  bcrypt.compare(password,user.password);
       if(!isMatch){
           return res.status(400).json(Error("Invalide passowrd"))
       }

        const token = user.getSignedJwtToken();
       res.json({
        msg:" Successfully registered user",
        data:user,
        token 
         });
    } catch (error) {
        console.log(error)
        res.status(400).json(Error(error.message));
        
    }
}


