const express = require("express")
const userController = require('./../Controller/userControllers')
const {auth} = require('./../Middleware/auth')

const router = express.Router();

router.post('/sign-in', userController.signIn)
router.post('/create-user', userController.createUser)
router.get('/me', auth, userController.me)
// router.get('/', auth, getUserData)
// router.get('/getDummyUser', getDummyUser)


module.exports = router;