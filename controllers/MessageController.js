const Chat = require("../models/Chat");

const createChat = async (req, res) => {
  try {
    const { body } = req;

    // Input Validation
    if (!body) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const chat = await Chat.create(body);
    return res.status(201).json(chat);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getChatsByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Input Validation
    if (!groupId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const chats = await Chat.findAll({ where: { groupId } });
    return res.status(200).json(chats);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createChat,
  getChatsByGroupId,
};
