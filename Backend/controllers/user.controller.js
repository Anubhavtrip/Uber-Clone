const userModel = require("../models/user.model");
const userService  = require("../services/user.service")
const {validationResult} = require("express-validator")




module.exports.registerUser = async(req,res,next)=>{
   const errors= validationResult(req);

   //if find error then send response
   if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array()});
   }

   const {fullname,email,password} = req.body;
   console.log(req.body);
   
   const hashedPassword = await userModel.hashPassword(password);
   console.log(hashedPassword,"hashedPassword");
   

   const user = await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword
   });

   const token= user.genrateAuthToken();


   res.status(200).json({token,user});
}