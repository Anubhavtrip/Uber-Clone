const userModel = require("../models/user.model")
const blacklistModel = require("../models/backlistToken.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "unathorized User" })
  };

  //if users save token in localstorage or paas any other user for this check blacklist collection

  const isBlacklistToken = await blacklistModel.findOne({ token: token });

  console.log(isBlacklistToken, "isBlacklistToken");


  if (isBlacklistToken) {
    return res.status(400).json({ message: "unathorized User" });
  }

  //token decoded

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorize User" })
  }
}