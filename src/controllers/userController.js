const bcrypt = require('bcrypt');
const userService = require('../services/userService.js');

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email){
     return res.status(400).json("Email is requird");
    }

    if(!password){
      return res.status(400).json("Password is required");
     }

    const existUser = await userService.getUserByEmail(email);
    if (existUser) {
      res.status(400).json("Email already exist");
    } else {
      const user = await userService.createUser(email, password);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    let data = result.message;
    res.status(result.status).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser };