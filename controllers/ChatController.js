const Chat = require("../models/Chat");

const createChat = async (req, res) => {
  try {
    const chat = await Chat.create(req.body);

    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createChat,
  getChats,
};
