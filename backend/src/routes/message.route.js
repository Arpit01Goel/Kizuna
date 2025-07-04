const express = require("express")
const router = express.Router();
const User = require("../models/user.model")
const protectRoute = require("../middlewares/auth.middleware")
const Message = require("../models/message.model")
const mongoose = require("mongoose")
const {io,getReceiverSocketId} = require("../lib/socket")
router.get("/users", protectRoute, async (req, res) => {
    try {

        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
router.post("/send/:id", protectRoute, async (req, res) => {
    try {
        const { text, image } = req.body;
        
        const { id: receiverUsername } = req.params
        
        const receiverObj = await User.findOne({ username: receiverUsername })
        const receiver = receiverObj._id
        const sender = req.user._id
        const nwMessage = new Message({
            sender: sender,
            receiver: receiver,
            text: text,
            image: image,
            time: new Date()
        })
        
        const SenderMessageModel =
        mongoose.models[`messages_${sender}`] || mongoose.model(`messages_${sender}`, Message.schema);
        await SenderMessageModel.create(nwMessage)

        const ReceiverMessageModel = mongoose.models[`messages_${receiver}`] ||mongoose.model(`messages_${receiver}`, Message.schema)
        try{
            await ReceiverMessageModel.create(nwMessage)

        }catch (err) {
            if (err.code!==11000) {
                throw err
            }
        }


        // //socket.io use here
        const receiverSocketId = getReceiverSocketId(receiver)
        if (receiverSocketId) {
            //receiver is online 
            io.to(receiverSocketId).emit("newMessage", nwMessage)
        }

        res.status(201).json(nwMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
})

router.get("/:id", protectRoute, async (req, res) => {
    try {
        const { id: receiverUsername } = req.params
        const receiverObj =await User.findOne({ username: receiverUsername })
        const receiver = receiverObj._id
        const sender = req.user._id
       
        const senderModel = mongoose.models[`messages_${sender}`] || mongoose.model(`messages_${sender}`, Message.schema);
        
        const messages = await senderModel.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        })
       
        
        res.status(200).json(messages)
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error" })
    }
})
module.exports = router