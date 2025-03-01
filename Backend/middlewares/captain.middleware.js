const captainModal = require('../models/captain.model')
const blacklistModel = require("../models/backlistToken.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.captainauthUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    //   console.log(token);

    if (!token) {
        return res.status(401).json({ message: "unathorized User" })
    };

    //if users save token in localstorage or paas any other user for this check blacklist collection

    const isBlacklistToken = await blacklistModel.findOne({ token: token });

    // console.log(isBlacklistToken, "isBlacklistToken");


    if (isBlacklistToken) {
        return res.status(400).json({ message: "unathorized User" });
    }

    //token decoded

    try {
        const decoded = jwt.verify(token, process.env.CAPTAIAN_JWT_TOKEN)
        console.log(decoded,"decoded")
        const captain = await captainModal.findById(decoded._id);
        console.log(captain,"captain");
        
        req.captain = captain;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorize captain" })
    }
}