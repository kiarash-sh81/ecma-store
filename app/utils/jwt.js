const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { userModel } = require('../model/user.model');

async function registerToken(payload){
    const token = await jwt.sign(payload , process.env.SECRETKEY, {
        expiresIn: '5h',
    })
    return token;
}

async function verifyAccessToken(req, res, next) {
    //*  Authorization : Bearer token
    const Auth = req.headers['authorization'];
    const Array = Auth.split(" ");
    const token = Array[1]
    const method = Array[0]
    if(token && method === 'Bearer'){
        jwt.verify(token,process.env.SECRETKEY, async(err, payload)=>{
            if(err) next(createError.Unauthorized("please login to you account"));
            const {id} = payload || {};
            const user = await userModel.findOne({_id: id},{password: 0});
            if(!user)  next(createError.Unauthorized("please login to you account"));
            req.user = user;
            return next();
        });
    }else{
        throw next(createError.Unauthorized("please login to you account"));
    }
}

module.exports ={
    registerToken,
    verifyAccessToken
}