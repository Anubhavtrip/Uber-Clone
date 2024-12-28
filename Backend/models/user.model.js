const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            // require:true, give option that last name you want to give or not
            minlength:[3,'Last name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be at least 5 character']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    //for track live location of driver
    socketId:{
        type:String,
    }
})


userSchema.methods.genrateAuthToken = function(){
    const token = jsonwebtoken.sign({_id:this._id},process.env.JWT_SECRET);
    return token
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}


userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10)
}

//for craete collection in database use model 
//first character is collection name and second is collection Schema.
const userModel = mongoose.model('user',userSchema)

module.exports = userModel;