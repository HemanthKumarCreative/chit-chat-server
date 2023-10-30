const Message = require("../models/Message");
const fs = require("fs");
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  region: "us-east-1", // e.g., us-east-1
});

const s3 = new AWS.S3();

const createMessage = async (req, res) => {
  try {
    let messageInfo = JSON.parse(req?.body?.message);
    messageInfo.attachmentUrl = null;
    if (req.file) {
      const fileContent = fs.readFileSync(req.file.path);
      const params = {
        Bucket: "expensetracker250923",
        Key: `uploads/${req.file.filename}`,
        Body: fileContent,
        ContentType: req.file.mimetype,
        ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      const attachmentUrl = uploadResult.Location;
      messageInfo.attachmentUrl = attachmentUrl;
      // Delete the temporary file after upload
      fs.unlinkSync(req.file.path);
    }

    const message = await Message.create(messageInfo);

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
