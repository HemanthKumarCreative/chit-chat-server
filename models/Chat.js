const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Chat = sequelize.define("chats", {
  userIds: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  messageContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chatId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  messageSender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  messageRecipients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  authTokens: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  messageEncryption: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Chat;
