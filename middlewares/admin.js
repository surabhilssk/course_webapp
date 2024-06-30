const { Admin } = require("../db");


async function adminMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    const value = await Admin.findOne({
        username: username,
        password: password
    });
    if(value){
        next();
    }else{
        res.status(403).json({
            msg: "Admin Not Found",
        })
    }
}

module.exports = adminMiddleware;