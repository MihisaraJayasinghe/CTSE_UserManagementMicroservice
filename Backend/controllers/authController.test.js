// tests/authController.test.js
const auth = require('../controllers/authController');   // adjust path
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---- Jest Mocks ----
jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

beforeEach(() => {
  jest.clearAllMocks();
  process.env.JWT_SECRET = 'test-secret';
});

// Helper to build mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

describe('register()', () => {
  it('hashes password and saves user', async () => {
    // Arrange
    const req = { body: { username: 'pasan', email: 'p@x.com', password: '123' }};
    bcrypt.hash.mockResolvedValue('hashedPw');
    User.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(true) }));

    const res = mockRes();

    // Act
    await auth.register(req, res);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
    expect(User).toHaveBeenCalledWith({ username: 'pasan', email: 'p@x.com', password: 'hashedPw' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered' });
  });

  it('returns 500 on error', async () => {
    const req = { body: { username: '', email: '', password: '' }};
    bcrypt.hash.mockRejectedValue(new Error('fail'));
    const res = mockRes();

    await auth.register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json.mock.calls[0][0]).toHaveProperty('error');
  });
});

describe('login()', () => {
  it('returns token for valid credentials', async () => {
    // Arrange
    const req = { body: { email: 'p@x.com', password: '123' }};
    const fakeUser = { _id: 'u1', password: 'hashed', username: 'pasan', email: 'p@x.com' };

    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('jwtToken');

    const res = mockRes();

    // Act
    await auth.login(req, res);

    // Assert
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'u1' }, 'test-secret', { expiresIn: '1d' });
    expect(res.json).toHaveBeenCalledWith({
      token: 'jwtToken',
      user: { id: 'u1', username: 'pasan', email: 'p@x.com' }
    });
  });

  it('rejects invalid password', async () => {
    const req = { body: { email: 'p@x.com', password: 'wrong' }};
    User.findOne.mockResolvedValue({ password: 'hashed' });
    bcrypt.compare.mockResolvedValue(false);
    const res = mockRes();

    await auth.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('rejects unknown user', async () => {
    User.findOne.mockResolvedValue(null);
    const res = mockRes();
    await auth.login({ body: { email: 'no@x.com', password: '123' }}, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});

describe('getProfile()', () => {
  it('returns user sans password', async () => {
    const req = { user: { id: 'u1' } };
    User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue({ id: 'u1', username: 'pasan' })});
    const res = mockRes();

    await auth.getProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith('u1');
    expect(res.json).toHaveBeenCalledWith({ id: 'u1', username: 'pasan' });
  });
});