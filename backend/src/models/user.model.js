const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,

    },
    profilePic: {
        type:String, 
        required: false, 
        default: ""
    }, 
},
    {timestamps: true}

)
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next()
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt)
//         next();

//     } catch (err) {
//         next(err)
//     }
// })
module.exports = mongoose.model("User", userSchema);