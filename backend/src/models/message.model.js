const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User",
            required: true
        }, 
        receiver: {
            type: mongoose.Schema.Types.ObjectId , 
            ref: "User",
            required: true
        }, 
        text: {
            type: String, 
            default: ""
        }, 
        image: {
            type: String, 
            default: ""
        },
        time: {
            type: Date, 
            default: Date.now,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Message",messageSchema)