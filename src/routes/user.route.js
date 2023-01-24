const express = require('express');
const app = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            res.status(401).send({ message: "User already exists" })
        } else {
            const newUser = new User({
                name,
                email,
                password,
                type: email.endsWith("masaischool.com") ? "admin" : "user"
            })
            await newUser.save()
            res.status(200).send({ message: `${newUser.type === "admin" ? "Admin" : "User"} Signup Successful`, user: { name: newUser.name, email: newUser.email, type: newUser.type, _id: newUser._id } })
        }
    } catch (error) {
        res.status(500).send({ message: "User Signup Failed Please Try Again" })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password })
        if (user) {
            let token = jwt.sign({ email, name: user.name, created: user.created }, process.env.JWT_SECRET)
            res.status(200).send({ message: "Login Successful", user: { name: user.name, email: user.email, type: user.type, _id: user._id }, token })
        } else {
            res.status(401).send({ message: "Invalid Credentails" })
        }
    } catch (error) {
        res.status(401).send({ message: "Login Failed Please Try Again" })
    }
})

module.exports = app;