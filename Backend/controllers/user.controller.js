const userModel = require("../models/user.model");
const userService  = require("../services/user.service")
const {validationResult} = require("express-validator")
const backlistToken = require("../models/backlistToken.model")



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


//login 

module.exports.loginUser = async(req,res,next)=>{

    //check validation error 
    const errors = validationResult(req);

    //if error exist

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    // extract the body

    const {email,password} = req.body;

    //check user exist or not 

    const user = await userModel.findOne({email}).select("+password");   ///select("+password"); this is userd for extractpassword 

    //here check that user exist by email
    if (!user) {
        return res.status(401).json({message:"Invalid email or password"})
    } 

    //here  check if user exist then password is match or not
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    //if every this is good then genrate the token 
    const token = user.genrateAuthToken()


    // send cookie for fetch profile details using cookie

    res.cookie('token',token);

    //send the status code 

    res.status(200).json({token,user});


}

// extract user profle

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user)

}

//logout user 

module.exports.logoutUser = async(req,res,next)=>{
    try {
        console.log(req.body, "line 94");
        res.clearCookie('token');

        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        console.log(token,"Line 103");

        await backlistToken.create({ token });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging out user" });
    }
};