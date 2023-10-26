const { Op } = require("sequelize");
const Group = require("../models/Group");

const createGroup = async (req, res) => {
  try {
    const { body } = req;

    // Input Validation
    if (!body) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const group = await Group.create(body);

    return res.status(201).json(group);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getGroupsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Input Validation
    if (!userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const groups = await Group.findAll({
      where: {
        [Op.or]: [
          {
            groupMembers: {
              [Op.contains]: [userId],
            },
          },
          {
            groupAdmins: {
              [Op.contains]: [userId],
            },
          },
        ],
      },
    });

    return res.status(200).json(groups);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getGroupByGroupId = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Input Validation
    if (!groupId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const group = await Group.findByPk(groupId);

    if (group) {
      return res.status(200).json(group);
    }

    return res.status(404).json({ message: "Group not found" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId, role } = req.body;

    // Input Validation
    if (!groupId || !userId || !role) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const { groupMembers, groupAdmins } = group;
    if (role === "member") {
      if (Array.isArray(groupMembers) && !groupMembers.includes(userId)) {
        await group.update({ groupMembers: [...groupMembers, userId] });
        return res.status(200).json({ message: "User added as group member" });
      }

      return res
        .status(200)
        .json({ message: "User is already a group member" });
    } else {
      if (Array.isArray(groupAdmins) && !groupAdmins.includes(userId)) {
        await group.update({
          groupAdmins: [...groupAdmins, userId],
          groupMembers: groupMembers.filter(
            (groupMember) => groupMember !== userId
          ),
        });
        return res.status(200).json({ message: "User added as group admin" });
      }

      return res.status(200).json({ message: "User is already a group admin" });
    }
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const removeUserFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    // Input Validation
    if (!groupId || !userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const { groupMembers } = group;

    if (Array.isArray(groupMembers) && groupMembers.includes(userId)) {
      const updatedGroupMembers = groupMembers.filter(
        (memberId) => memberId !== userId
      );

      await group.update({ groupMembers: updatedGroupMembers });
      return res.status(200).json({ message: "User removed from the group" });
    }

    return res
      .status(200)
      .json({ message: "User is already removed from the group" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createGroup,
  getGroupsByUserId,
  getGroupByGroupId,
  addUserToGroup,
  removeUserFromGroup,
};
