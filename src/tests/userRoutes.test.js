const request = require('supertest');
const app = require('../app.js');
const userService = require('../services/userService.js');

// Mock the userService to isolate tests
jest.mock('../services/userService.js');

describe('User Routes Tests', () => {
  describe('POST /api/users/register', () => {
    test('should register a new user successfully', async () => {
      userService.getUserByEmail.mockResolvedValue(null);
      userService.createUser.mockResolvedValue({  email: 'test@example.com' });

      const res = await request(app)
        .post('/api/users/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    test('should return 400 if email already exists', async () => {
      userService.getUserByEmail.mockResolvedValue({  email: 'test@example.com' });

      const res = await request(app)
        .post('/api/users/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toBe('Email already exist');
    });

    test('should return 400 if email or password is missing', async () => {
      let res = await request(app).post('/api/users/register').send({ password: 'password123' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toBe('Email is requird');

      res = await request(app).post('/api/users/register').send({ email: 'test@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toBe('Password is required');
    });
  });

  describe('POST /api/users/login', () => {
    test('should log in a user successfully', async () => {
      userService.loginUser.mockResolvedValue({ status: 200, message: 'Login successful' });

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data', 'Login successful');
    });

    test('should return 401 for invalid credentials', async () => {
      userService.loginUser.mockResolvedValue({ status: 401, message: 'Invalid credentials' });

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('data', 'Invalid credentials');
    });
  });
});
