const { default: mongoose } = require("mongoose");
const http = require('http');
const express = require('express');
const { router } = require("./routes/routes");

class Server {
    #PORT;
    #URI;
    #APP = express();

    constructor(port, uri){
        this.#PORT = port;
        this.#URI = uri;
        this.configApplication();
        this.configDataBase();
        this.createServer();
        this.configRouter();
        this.errorHandeling();
    }



    configDataBase(){
        mongoose.set('strictQuery', false);
        mongoose.connect(this.#URI, (err) =>{
            if(!err){
                return console.log(`database connected successfully`);
            }
            return console.log(`error on connectiong database`);
        })
    }

    configApplication(){
        this.#APP.use(express.urlencoded({extended: true}));
        this.#APP.use(express.json());
        require('dotenv').config();
        // const server = http.createServer(this.#APP);
        // server.listen(this.#PORT, (err) =>{
        //     if(err){
        //         return console.log("can not connect to port");
        //     }
        //     return console.log(`connected to port ${this.#PORT} successfully`);
        // })

    }

    createServer() {
        const http = require('http');
        const server = http.createServer(this.#APP).listen(this.#PORT, () => {
            console.log("Server Running > https://api.uniways.ir:" + this.#PORT);
        })
    }

    configRouter(){
        this.#APP.get("/", (req, res) =>{
            return res.json({
                message: "app online now",
            })
        })

        this.#APP.use(router);
    }

    errorHandeling() {
        this.#APP.use((error, req, res, next)=>{
            const status = error.statusCode || 500;
            const message = error.message || "internal server error";
            return res.status(status).json({
                statusCode: status,
                message
            })
        })
    }

    
}

module.exports = {
    Server
}