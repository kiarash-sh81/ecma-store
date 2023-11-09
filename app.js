const { Server } = require("./app/server");

const DB_URI= "mongodb://localhost:27017/store_ecma";
const PORT = 3000;

const server = new Server(PORT, DB_URI);