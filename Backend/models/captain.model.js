const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 character long"]
        },
        lastname: {
            type: String,
            // required:true,
            minlength: [3, "Last name must be at least 3 character long"]
        },
    },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,

        },
        password: {
            type: String,
            required: true,
            select: false
        },
        //for track live location of driver
        socketId: {
            type: String,
        },
        status:{
            type:String,
            enum:['active','inactive'],
            default:'active'
        },
        vehicle:{
            color:{
                type:String,
                required:true,
                minlength:[3,"Color must be atlest 3 character long"]
            },
            plate:{
                type:String,
                required:true,
                minlength:[3,'Plate must be atleast 3 charcter long']
            },
            capacity:{
                type:Number,
                required:true,
                minlength:[1,"Capacity must be atlest 1"]
            },
            vehicleType:{
                type:String,
                required:true,
                enum:["car","motorcycle","auto"]
            }
        },
        location:{
            lat:{
                type:Number,
                
            },
            long:{
                type:Number
            }
        }


})





