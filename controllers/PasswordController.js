const User = require("../models/User");
const Password = require("../models/Password");
const bcrypt = require("bcrypt");

const { tranEmailApi } = require("../utils/mailTransporter");
const { generateRandomToken } = require("../utils/tokenGenerate");

const forgotPassword = async (req, res) => {
  const { userEmail } = req.body;
  const resetToken = await generateRandomToken();
  const sender = {
    email: "avisihk@gmail.com",
  };
  const receivers = [{ email: userEmail }];
  try {
    const user = await User.findOne({ where: { userEmail } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Password.create({ user_id: user.userId, resetToken });

    await user.update({ resetToken });

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset",
      htmlContent: `
          <p>Hello,</p>
          <p>Please click the following link to reset your password:</p>
          <a href="http://localhost:3000/reset-password?token=${resetToken}&email=${userEmail}">Reset Password</a>
        `,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ userPassword: hashedPassword });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};