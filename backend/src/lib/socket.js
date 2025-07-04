const {Server} = require("socket.io")
const express = require("express")
const http = require("http")
const dotenv = require("dotenv")
dotenv.config();
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL]  
    }
})
const userSocketMap = {}
function getReceiverSocketId(userId) {
return userSocketMap[userId]
}

io.on("connection", (socket) =>{
    const userId =  socket.handshake.query.userId 
    if (userId) userSocketMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys( userSocketMap))
    socket.on("disconnect", () =>{
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports = {io, app, server, getReceiverSocketId}