const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
