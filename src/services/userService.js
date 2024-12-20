const userRepository = require('../repositories/userRepository.js');
const { generateToken } = require('../utils/jwtUtils.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const createUser = async (email, password) => {
    // Validate input
    // Hash password
    // Create user in database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword);
    return user;
};

const loginUser = async (email, password) => {
    // Validate input
    // Check if user exists
    // Verify password
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        return { status: 400, message: "User not Exist" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { status: 400, message: "Password Incorrect" };
    }

    const token = generateToken(user);
    return { status: 200, message: token };
};

const getUserByEmail = async (email) => {
    const user = await userRepository.getUserByEmail(email);
    return user;
};

module.exports = { createUser, loginUser, getUserByEmail };
