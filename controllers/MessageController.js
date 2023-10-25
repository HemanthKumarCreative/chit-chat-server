const Message = require("../models/Message");

const createMessage = async (req, res) => {
  try {
    const { body } = req;

    // Input Validation
    if (!body) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const message = await Message.create(body);

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getMessagesByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Input Validation
    if (!groupId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const messages = await Message.findAll({ where: { groupId } });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessagesByGroupId,
};
