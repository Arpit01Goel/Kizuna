const express = require('express');
const router = express.Router();
const dotenv = require("dotenv")
const User = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const protectRoute = require("../middlewares/auth.middleware.js")
const generateToken = require("../lib/functions.js")
dotenv.config();
router.use(express.json());


router.post("/signup", async (req, res) => {
    try {
        console.log("signup requrest")
        const { firstName, lastName, email, password, username } = req.body;
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: password

        })

        let existing = await User.findOne({ username: username });
        if (existing) return res.status(400).json({ message: "username already exist" })
        existing = await User.findOne({ email: email })
        if (existing) return res.status(400).json({ message: "email already registered" })

        //hash is manually 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        //login automatically
        generateToken(user._id, res)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })




    } catch (err) {
        console.log(err)
        res.send(500).json({ message: "internal server error" })
    }
})
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // console.log(userna)
    try {

        const user = await User.findOne({ username: username })

        if (!user) {
            return res.status(404).json({ message: "Invalid credientials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(404).json({ message: "Invalid credientials" })

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal server error" })
    }
})
router.post("/logout", async (req, res) => {
    //logic of logout
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).send({ message: "Logged out successfully" })
    } catch (err) {
        res.send(500).json({ message: "Internal server error" })
    }
})

router.put("/update_profile", protectRoute, async (req, res) => {
    try {
        const { firstName, lastName, email, username } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { firstName, lastName, email, username },
            { new: true, runValidators: true }
        )
        console.log("updating in db start")
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log("error is here")
        res.status(500).json({ error: error })
    }
})
router.get("/check", protectRoute, async (req,res) =>{
    try {
        res.status(200).json(req.user)
    }catch(err) {
        res.status(500). json({error: err})
    }
})
module.exports = router
