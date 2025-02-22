const captainModal = require('../models/captain.model')
const captainService = require("../services/captain.service")
const {validationResult} = require('express-validator')


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


