const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const messageRoute = require("./routes/message.route")
const authRoute = require("./routes/auth.route")
const cors = require("cors")

const dotenv = require("dotenv")
dotenv.config();
const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((err) => {
        console.log("failed to connect to mongo: ", err);
        process.exit(1);
    })

app.use("/auth" , authRoute);

app.use("/message", messageRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server started at port: ", PORT);
})