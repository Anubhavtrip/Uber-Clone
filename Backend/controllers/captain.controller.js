const captainModal = require('../models/captain.model')
const captainService = require("../services/captain.service")
const {validationResult} = require('express-validator')
const backlistToken = require("../models/backlistToken.model")

module.exports.captainRegister = async(req,res,next)=>{
    const error = validationResult(req);
//if error exist
    if (!error.isEmpty()) {
        res.status(400).json({error:error.array()})
    }

    //extract the body 
    const {fullname,email,password,vehicle} = req.body;

    //find that captain email already exist or not

    const isCaptainEmailExist  = await captainModal.findOne({email});

    if(isCaptainEmailExist){
       return res.status(400).json({msg:"Email is already exist try other email id"})
    }

    
    const hashedPassword  = await captainModal.hashConverter(password);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate, 
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType   
    
    }
    );

    console.log(captain)

    const token = captain.generateToken()

    res.status(200).json({token,captain})

}

//login 

module.exports.login = async(req,res,next)=>{

    //check validation error
    const error=  validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    //extract data from req


    const {email,password}= req.body;
    //find email
    const captain  = await captainModal.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json({message:"Invalid email or password"})
    }

    // match password

    const passwordMatch =  await captain.compareCaptainPassword(password)

    if (!passwordMatch){
        return res.status(400).json({message:"Password is incorrect"})
    }

    const token =  captain.generateToken();

  
    // send cookie for fetch profile details using cookie

    res.cookie('token',token)

    res.status(200).json({token,captain})



}

//profile

module.exports.getProfile = async(req,res,next)=>{
    res.status(200).json(req.captain);
}

//logout 

module.exports.logout = async(req,res)=>{
    try {
        res.clearCookie('token')

        const token = req.cookies?.token || req.header.authorization?.split(' ')[1];
        console.log(token,"token")
        //check the token is exist or not
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

           await backlistToken.create({ token });
            res.status(200).json({ message: "Captain logged out successfully" });

        // res.clearInterval('token');
    } catch (error) {
        res.status(500).json({message:"Error logging out captain"})
    }
}


