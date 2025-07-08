const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")
require("dotenv").config();
const reviewSchema = require("../models/review.model")
const protectRoute = require("../middlewares/auth.middleware")

router.post("/contactUs", protectRoute , async (req, res) => {
    try {
        //send a mail
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.user.email, 
            subject: req.body.Subject, 
            text: req.body.Message
        }
        
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: "email send successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})
router.post("/review", protectRoute, async(req, res) =>{
    try {
        const nwReview = new reviewSchema({
            user: req.user.username,
            rating: req.body.rating, 
            text: req.body.reviewMessage
        })
        await nwReview.save()
        res.status(200).json(nwReview)
    } catch (error) {
        res.status(500).json({message: error})
    }   
})
router.get("/review", async(req,res) =>{
    try {
        const reviews = await reviewSchema.find({})
        
        res.status(200).json({reviews: reviews})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router