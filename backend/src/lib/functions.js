const jwt  = require("jsonwebtoken")

function generateToken(userId, res) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "8h"
    })
    res.cookie("jwt", token,{
        maxAge: 8*3600*1000,
        sameSite: "None", 
        httpOnly: true,
        secure: true
    })
    return token;
}

module.exports =  generateToken;