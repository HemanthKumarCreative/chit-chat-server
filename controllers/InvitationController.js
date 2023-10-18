const Invitation = require("../models/Invitation");
const Group = require("../models/Group");

const createInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.create(req.body);

    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInvitations = async (req, res) => {
  const userId = req.params.userId;
  try {
    const invitations = await Invitation.findAll({
      where: { userId },
    });
    res.status(200).json(invitations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const acceptInvitation = async (req, res) => {
  const invitationId = req.params.invitationId;
  try {
    const invitation = await Invitation.findByPk(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation Not Found" });
    }

    const groupId = invitation.groupId;
    const userId = invitation.userId;
    const group = await Group.findByPk(groupId);
    const members = group.members;
    await group.update({ members: [...members, userId] });

    await invitation.destroy();
    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};

const rejectInvitation = async (req, res) => {
  const invitationId = req.params.invitationId;
  try {
    const invitation = await Invitation.findByPk(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation Not Found" });
    }

    await invitation.destroy();
    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createInvitation,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
};
