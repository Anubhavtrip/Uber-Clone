const express = require("express");
const router = express.Router()
//use express- validater for validation
const {body} =require("express-validator")
const middleware = require("../middlewares/auth.middleware")
const userController = require("../controllers/user.controller")


router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 charater long'),
    body("fullname.lastname").isLength({min:3}).withMessage("Last name must be atleast 3 character"),
    body("password").isLength({min:6}).withMessage("password must be 6 character long")
],
userController.registerUser
);


//login 

router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("password must be 6 character long")
],userController.loginUser)


//profile 


router.get("/profile",middleware.authUser,userController.getUserProfile)
router.get("/logout",middleware.authUser,userController.logoutUser)

module.exports = router;