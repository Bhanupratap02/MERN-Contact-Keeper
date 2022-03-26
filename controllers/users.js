const User =  require("../models/User");
const Error = require("../middlewares/error")


//@desc   Register a user
//@route  POST /api/users
//@access   Public
exports.registerUser = async (req,res,next) =>{
 try {
   const { name , email,password} = req.body;
 let user = await User.findOne({email:req.body.email});
 if(user){
     return res.status(400).json({msg:"User already exists"});
 }
 user =  await User.create({
    name,
     email,
     password
 });
 const token = user.getSignedJwtToken();
  res.json({
     msg:" Successfully registered user",
     data:user,
     token 

 });
     
 } catch (error) {
    //  throw new Error(`Error in user register function-->`,error)
return res.status(500).json(Error(error.message))
 }
    

}