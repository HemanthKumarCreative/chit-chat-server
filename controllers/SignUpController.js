const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const { userName, userEmail, userMobile, userPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const user = await User.create({
      userName,
      userEmail,
      userMobile,
      userPassword: hashedPassword,
      userGroups: [],
    });
    await user.update({ isSignedIn: true });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.userId = token;

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "Sign Up successful", user, token });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = {
  signup,
};
