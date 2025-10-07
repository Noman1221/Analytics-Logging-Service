import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashpass = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashpass });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", token, user: { id: newUser._id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            res.status(400).json({ message: "invalid credentials" });
        };
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        await user.save();
        res.status(200).json({ message: "Login successful", token: token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export { login, register };
