const router = require('express').Router();
const {usercontroller} = require('../http/user/user.controller');
const { verifyAccessToken } = require('../utils/jwt');

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/profile",verifyAccessToken ,usercontroller.profile)

module.exports ={
    userRoutes: router
}