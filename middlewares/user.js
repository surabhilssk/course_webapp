const { User } = require("../db");
async function userMiddleware(req, res, next){
    const username = req.header.username;
    const password = req.header.password;
    const value = await User.findOne({
        username: username,
        password: password
    })
    if(value){
        next();
    }else{
        res.status(403).json({
            msg: "User Doesn't Exist"
        })
    }
}

module.exports = userMiddleware;