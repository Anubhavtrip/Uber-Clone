const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser")



connectToDb();

//this is use for when you development then accept all website request. if you want setup that only specific domain accept the request then pass on it  

app.use(cors());

//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//initiialize routes

app.use('/users',userRoutes);



module.exports = app;