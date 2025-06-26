const jwt  = require("jsonwebtoken")

function generateToken(userId, res) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "8h"
    })
    res.cookie("jwt", token,{
        maxAge: 8*3600*1000,
        sameSite: "strict", 
        httpOnly: true,
        secure: process.env.NODE_ENV != "development"
    })
    return token;
}

module.exports =  generateToken;