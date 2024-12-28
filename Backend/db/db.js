const mongoose = require("mongoose");


//connect Database
function connectToDb (){
    mongoose.connect(process.env.DB_CONNECT).then(()=>console.log("Connect database"))
    .catch(err => console.log(err));
}

module.exports = connectToDb;