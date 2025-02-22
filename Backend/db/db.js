const mongoose = require("mongoose");


//connect Database using promise
function connectToDb (){
    mongoose.connect(process.env.DB_CONNECT).then(()=>console.log("Connect database"))
    .catch(err => console.log(err));
}


//connect Databse using async and await

// async function connectToDb(){
//     try{
//         await mongoose.connect(process.env.DB_CONNECT);
//         console.log("mongo database is succesfully connected");
//     }catch(err){
//         console.log("err",err);
//     }
// }
module.exports = connectToDb;


