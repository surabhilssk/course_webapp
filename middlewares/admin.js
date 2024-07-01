const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const { JWT_SECRET } = require("../secrets/secret");


async function adminMiddleware(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if(decodedValue.username){
        next();
    }else{
        json.status(403).json({
            message: "You're not authenticated"
        })
    }
}

module.exports = adminMiddleware;