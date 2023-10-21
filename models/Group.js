const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Group = sequelize.define("groups", {
  groupId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupMembers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  groupAdmins: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

module.exports = Group;
