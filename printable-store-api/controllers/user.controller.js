import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password if provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email, ...(hashedPassword && { password: hashedPassword }) },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Failed to update user profile' });
  }
};