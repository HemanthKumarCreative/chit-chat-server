const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { body } = req;

    // Input Validation
    if (!body) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.create(body);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Input Validation
    if (!userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findByPk(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateUserGroups = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    if (!userId || !groupId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { userGroups, userName } = user;
    await user.update({ userGroups: [...userGroups, groupId] });
    return res
      .status(200)
      .json({ message: `${userName} Joined the Group Successfully` });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByUserId,
  updateUserGroups,
};
