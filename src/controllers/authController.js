import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

 
    await User.createUser(username, hashedPassword, email);

    res.status(201).json({
      status: "Account successfully created",
      status_code: 201,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.findUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({
          status: "Incorrect username/password provided. Please retry",
          status_code: 401,
        });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          status: "Incorrect username/password provided. Please retry",
          status_code: 401,
        });
    }

    
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "Login successful",
      status_code: 200,
      access_token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
