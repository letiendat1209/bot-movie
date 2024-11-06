import User from "../models/User";
import dotenv from "dotenv";
import { signUpValidator, signInValidator } from "../validations/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
dotenv.config();

const { SECRET_KEY, EMAIL_USER, EMAIL_PASS } = process.env;

// Đăng ký xác thực
export const signUp = async (req, res) => {
  const { error } = signUpValidator(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { username, first_name, last_name, email, password } = req.body;
    console.log("SignUp - Starting registration for:", email);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("SignUp - Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }
    // Không hash password ở đây, trong model hash rồi
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      password, // Password gốc, sẽ được hash bởi hook
    });

    console.log("SignUp - User created successfully:", {
      id: newUser.id,
      email: newUser.email,
    });

    const token = jwt.sign({ id: newUser.id }, SECRET_KEY);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("SignUp - Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// Đăng nhập
export const signIn = async (req, res) => {
  const { error } = signInValidator(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { email, password } = req.body;
    console.log("SignIn - Attempting login for:", email);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("SignIn - User not found:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Sử dụng method có sẵn trong model
    const validPassword = await user.validatePassword(password);

    if (!validPassword) {
      console.log("SignIn - Invalid password for:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: user,
    });
  } catch (error) {
    console.error("SignIn - Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ error: "Email not found" });

    // Tạo token đặt lại mật khẩu
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // Token hết hạn sau 1 giờ

    // Lưu token vào user model
    user.reset_token = resetToken;
    user.reset_token_expiry = resetTokenExpiry;
    await user.save();

    // Gửi email đặt lại mật khẩu
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset your password: http://localhost:3000/reset-password/${resetToken} (hack nick mày giờ)`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Đặt lại mật khẩu
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      where: {
        reset_token: token,
        reset_token_expiry: { [Op.gt]: Date.now() }, // Token còn hiệu lực
      },
    });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    // Hash mật khẩu mới và lưu lại
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);
    user.reset_token = null; // Xóa token sau khi đặt lại mật khẩu
    user.reset_token_expiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xác minh email ?
