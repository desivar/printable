import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to log in user' });
  }
};