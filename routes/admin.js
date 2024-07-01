const express = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../db");
const { JWT_SECRET } = require("../secrets/secret");
const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const value = await Admin.findOne({
        username: username
    })
    if (value) {
        res.json({
            message: "username already exists"
        })
    } else {
        try {
            await Admin.create({
                username: username,
                password: password
            })
            res.json({
                message: "Admin created successfully"
            })
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Some unknown error has occured!"
            })
        }
    }
});

router.post('/signin',async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const value = await Admin.findOne({
        username: username,
        password: password
    })
    if(value){
        try{
            const token = jwt.sign({username},JWT_SECRET);
            res.json({
                token: token
            })
        }catch{
            json.status(402).json({
                message: "Error occured while creating token"
            })
        } 
    }else{
        res.status(403).json({
            message: "Incorrect username or password"
        })
    }
})

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const value = await Course.findOne({
        title: title
    })
    if (value) {
        res.status(400).json({
            message: "Course already exists in db!",
        })
    } else {
        try {
            const newCourse = await Course.create({
                title: title,
                description: description,
                price: price,
                imageLink: imageLink
            });
            res.json({
                message: "Course created successfully",
                courseId: newCourse._id
            })
        } catch (e) {
            res.status(400).json({
                message: "Some error occured while creating the course"
            })
        }
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {

});

module.exports = router;