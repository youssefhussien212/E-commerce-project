import express from "express";
import bcryt from  'bcrypt';
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Validate password requirements
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit" });
        }

        const hashPassword = await bcryt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        await newUser.save();
        return res.json({ status: true, message: "Record registered" });
    } catch (error) {
       
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email or username already exists" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User is not registered" });
        }
        const validPassword = await bcryt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { maxAge: 360000 });
        return res.json({ status: true, message: "Login successful", token: token }); // Include token in the response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});






export { router as UserRouter };
