const mongoose = require("mongoose")
export const connectDB = async () =>{
    try {
        await  mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("mongo not connected")
        console.log(error);
    }
}