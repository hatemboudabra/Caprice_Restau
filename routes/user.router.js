const express = require('express')
const rout = express.Router()


const usercontroller = require('../controllers/user.controller')


rout.post('/sign',usercontroller.signup)
rout.post('/signin',usercontroller.signin)


module.exports = rout