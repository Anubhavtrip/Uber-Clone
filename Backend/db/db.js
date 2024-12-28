const mongoose = require("mongoose");


//connect Database
function connectToDb (){
    mongoose.connect(process.env.DB_CONNECT,{
        useNewURLParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("Connect database"))
    .catch(err => console.log(err));
}

module.exports = connectToDb;