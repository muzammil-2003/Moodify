const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const redis = require('../config/cache')

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: "User already registered."
            })
        }

        const user = await userModel.create({
            username, email, password
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

        res.cookie('token', token)

        return res.status(201).json({
            message: "User created successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })

    }
}

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if ((!username && !email) || !password) {
            return res.status(400).json({
                message: "Please provide username/email and password."
            })
        }

        const user = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        }).select('+password')

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "User not found."
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

        res.cookie('token', token)

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: "No token provided."
            });
        }
        res.clearCookie('token')

        await redis.set(token, Date.now().toString(), "EX", 60*60)

        res.status(200).json({
            message: "Logout successfully."
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = { registerUser, loginUser, getMe, logoutUser }