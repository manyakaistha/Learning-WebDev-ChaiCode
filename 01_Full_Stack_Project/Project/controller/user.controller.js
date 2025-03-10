import User from "../model/User.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;
    
    // Validate input (basic validation)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      verificationToken
    });
    
    // Save user to database
    await newUser.save();
    
    // In a real app, send verification email here
    
    // Return success response
    res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: newUser._id, name, email } 
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    // Extract login credentials
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    };
    
    // Set cookie with token
    res.cookie('token', token, cookieOptions);
    
    // Return success response
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Verify user email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    // Find user with the verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }
    
    // Update user verification status
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying email", error: error.message });
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Set token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // In a real app, send reset email here
    
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error requesting password reset", error: error.message });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    // Find user with the reset token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    
    // Update password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error getting user profile", error: error.message });
  }
};

// Logout user
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
};

export { 
  registerUser, 
  loginUser, 
  verifyEmail, 
  requestPasswordReset, 
  resetPassword, 
  getCurrentUser, 
  logoutUser 
};
