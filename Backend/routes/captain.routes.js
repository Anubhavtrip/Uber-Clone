const express = require('express')
const CaptainRouter = express.Router()
const captainController = require('../controllers/captain.controller')
const {body} = require('express-validator')


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

module.exports = CaptainRouter;