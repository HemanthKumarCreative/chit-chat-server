const Group = require("../models/Group");

const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);

    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
};
