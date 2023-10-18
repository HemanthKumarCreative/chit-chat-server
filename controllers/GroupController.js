const Group = require("../models/Group");
const Sequelize = require("sequelize");
const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGroupsByUserId = async (userId) => {
  try {
    const groups = await Group.findAll({
      where: {
        members: {
          [Sequelize.Op.contains]: [userId], // Assuming members is an array field
        },
      },
    });

    return groups;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching groups by user ID");
  }
};

const getGroups = async (req, res) => {
  const userId = req.params.userId;
  try {
    const groups = await getGroupsByUserId(userId);

    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGroup = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const group = await Group.findByPk(groupId);
    res.status(200).json(group);
  } catch (err) {
    console.error(err);
  }
};

const putGroup = async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.body.userId;
  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    const { admins } = group;
    if (!admins.includes(userId)) {
      await group.update({ admins: [...admins, userId] });
      res.status(201).json({ message: "Admin Added" });
    } else {
      console.log("User is already an admin.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  putGroup,
};
