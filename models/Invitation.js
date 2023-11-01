const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Group = require("../models/Group");

const Invitation = sequelize.define("invitations", {
  invitationId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recieverId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invitationStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Invitation;

Group.hasMany(Invitation, { foreignKey: "groupId" });
Invitation.belongsTo(Group, { foreignKey: "groupId" });
