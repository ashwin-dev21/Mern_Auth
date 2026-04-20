import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { otpTemplate } from "../utils/emailTemplate.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// REGISTER
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email }))
    return res.status(400).json({ msg: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  await User.create({
    email,
    password: hashed,
    otp,
    otpExpire: Date.now() + 300000,
  });

  await sendEmail(email, "Verify Email", otpTemplate(otp));

  res.json({ msg: "OTP sent" });
};

// VERIFY
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpire < Date.now())
    return res.status(400).json({ msg: "Invalid OTP" });

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.json({ msg: "Verified" });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(400).json({ msg: "Verify email" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, { httpOnly: true });

  res.json({ msg: "Logged in" });
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};

// FORGOT
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const otp = generateOTP();

  user.otp = otp;
  user.otpExpire = Date.now() + 300000;

  await user.save();
  await sendEmail(email, "Reset Password", otpTemplate(otp));

  res.json({ msg: "OTP sent" });
};

// RESET
export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  user.password = await bcrypt.hash(password, 10);
  user.otp = null;

  await user.save();

  res.json({ msg: "Password reset" });
};