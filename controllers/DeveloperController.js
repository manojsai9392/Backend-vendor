const Developer = require('../models/Developer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.SECRET_KEY; // Ensure you use a meaningful environment variable name

// Developer Registration
const developerRegister = async (req, res) => {
    const { username, email, password, skills, interests, experienceLevel } = req.body;
    try {
        const developerEmail = await Developer.findOne({ email });
        if (developerEmail) {
            return res.status(400).json({ error: "Email already taken" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newDeveloper = new Developer({
            username,
            email,
            password: hashedPassword,
            skills,
            interests,
            experienceLevel
        });
        await newDeveloper.save();

        res.status(201).json({ message: "Developer registered successfully" });
        console.log('Developer registered');
    } catch (error) {
        console.error('Registration error:', error.message); // Detailed logging
        res.status(500).json({ error: "Internal server error" });
    }
};


// Developer Login
const developerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const developer = await Developer.findOne({ email });
        if (!developer || !(await bcrypt.compare(password, developer.password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ developerId: developer._id }, secretKey, { expiresIn: '1h' });

        const developerId = developer._id;

        res.status(200).json({ success: "Login successful", token, developerId });
        console.log(email, "this is token", token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { developerRegister, developerLogin };
