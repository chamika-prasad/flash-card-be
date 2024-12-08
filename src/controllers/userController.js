import bcrypt from 'bcrypt';
import userService from '../services/userService.js';

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await userService.getUserByEmail(email);
    if (existUser) {
      res.status(400).json("User name already exist");
    } else {
      const user = await userService.createUser(email, password);
      res.status(201).json(user);
    }


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    let data = result.message;
    res.status(result.status).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};