const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    const value = await User.findOne({
        username: username,
    })
    if(value){
        res.json({
            message: "User already exists with this username"
        })
    }else{
        try{
            await User.create({
                username: username,
                password: password
            });
            res.status(200).json({
                message: "User created successfully!"
            })
        }catch(e){
            res.status(400).json({
                message: "Some error while signing up"
            })
        }
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const data = await Course.find({});
    res.json({
        courses: data,
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    try{
        await User.updateOne({
            username: username
        },{
            "$push": {
                purchasedCourses: courseId
            }
        });
        res.json({
            message: "Course purchase successfull!"
        })
    }catch(e){
        console.log(e);
        res.status(403).json({
            message: "Something wrong happened!"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username: username
    });
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses,
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router