const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("users", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userMobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isUserSignedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  latestResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
