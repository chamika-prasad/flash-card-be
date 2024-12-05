import userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwtUtils.js';

const createUser = async (email, password) => {
  // Validate input
  // Hash password
  // Create user in database
  const user = await userRepository.createUser(email, password);
  return user;
};

const loginUser = async (email, password) => {
  // Validate input
  // Check if user exists
  // Verify password
  const user = await userRepository.getUserByEmail(email);
  const token = generateToken(user);
  return token;
};

export default { createUser, loginUser };