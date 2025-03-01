const express = require('express')
const CaptainRouter = express.Router()
const captainController = require('../controllers/captain.controller')
const captainMiddleware = require('../middlewares/captain.middleware')

const {body} = require('express-validator')

//captain registrion
CaptainRouter.post('/captain-registration',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name minimum in 3 character'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name atleast in 3 charcter'),
    body("password").isLength({min:6}).withMessage("password must be 6 character long"),
    body("vehicle.color").isLength({min:3}).withMessage("vehicle color atlease in 3 charcter"),
    body("vehicle.plate").isLength({min:3}).withMessage("plate must be atleast 3 charcter long"),
    body("vehicle.capacity").isLength({min:1}).withMessage("capacity atleast 1"),
    body("vehicle.vehicleType").isIn(["car","motorcycle","auto"]).withMessage('Invalid vehicle type')

],captainController.captainRegister)



CaptainRouter.post("/login",[
    body("email").isEmail().withMessage("Invalid email id"),
    body("password").isLength({min:6}).withMessage("password must be 6 character long"),
],captainController.login)

//profile
CaptainRouter.get("/profile",captainMiddleware.captainauthUser,captainController.getProfile)

//logout 

CaptainRouter.post("/logout",captainMiddleware.captainauthUser,captainController.logout)

module.exports = CaptainRouter;