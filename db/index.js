const mongoose = require("mongoose");
const key = require("../secrets/secret");

mongoose.connect(key);

//defining schema for admin
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

//defining schema for the user
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


//defining schema for course
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

//creating models for each categories
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

//exporting the modules for accessing in different files
module.exports = {
    Admin,
    User,
    Course
}