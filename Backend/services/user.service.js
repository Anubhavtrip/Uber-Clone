const userModel = require("../models/user.model");

//for connect to db for create user
module.exports.createUser = async({ firstname,lastname,email,password})=>{
    //if not prenst
    console.log(firstname,email,password)
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }
    //if all fields are present then craete a user
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}