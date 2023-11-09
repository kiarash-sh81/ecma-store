const { userModel } = require("../../model/user.model");
const { registerToken } = require("../../utils/jwt");
const bycript = require('bcrypt');

class userController{
    async register(req, res, next){
        try {   
            const {phone, username, password, confirmPassword, email} = req.body;
            const existUser = await userModel.findOne({phone: phone});
            const existUsername = await userModel.findOne({username});
            const existUserEmail = await userModel.findOne({email});
            if(existUser || existUsername || existUserEmail){
                return res.status(400).json({
                    statusCode: 400,
                    message: "this phone number already exist"
                })
            }
    
            if(password !== confirmPassword){
                return res.status(400).json({
                    statusCode: 400,
                    message: "password and confirm password not matching"
                })   
            }
            const salt = bycript.genSaltSync(10);
            const hashPassword = bycript.hashSync(password, salt);

            const creatUser = await userModel.create({username,email,phone,password: hashPassword});
            if(!creatUser) throw new Error('internal server error');
            const payload = {
                id: creatUser._id,
            }
            const token = await registerToken(payload);
            return res.status(201).json({
                statusCode: 201,
                data:{
                    accessToken: token
                }
            })
        } catch (error) {
            next(error)
        }

    }

    async login(req, res, next){
        try {
            const {username, password} = req.body;
            const user = await userModel.findOne({username});
            if(!user) throw new Error("username or password is incorecct");
            const compare = bycript.compareSync(password, user.password);
            if(!compare) throw new Error("username or password is incorecct");
            const payload = {
                id: user._id,
            }
            const token = await registerToken(payload);
            return res.status(200).json({
                statusCode: 200,
                accessToken: token
            })
        } catch (error) {
            next(error)
        }
    }

    async profile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                statusCode: 200,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    usercontroller: new userController()
}