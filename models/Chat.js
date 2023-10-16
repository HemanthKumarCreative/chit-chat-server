const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Chat = sequelize.define("chats", {
  chatId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Chat;
