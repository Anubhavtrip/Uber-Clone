const captainModal = require('../models/captain.model')

module.exports.createCaptain = async({firstname,lastname,email,password,color,plate,capacity,vehicleType})=>{

    //check anything is empty or not 
    if(!firstname || !lastname || !email || !password || !color || !plate || !capacity){
        throw new Error("All fields are required")
    }
    const captain = captainModal.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}