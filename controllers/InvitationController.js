const Invitation = require("../models/Invitation");

const createInvitation = async (req, res) => {
  try {
    const { body } = req;

    // Input Validation
    if (!body) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const invitation = await Invitation.create(body);
    return res.status(201).json(invitation);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getInvitationsByRecieverId = async (req, res) => {
  try {
    const { recieverId } = req.params;

    // Input Validation
    if (!recieverId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const invitations = await Invitation.findAll({
      where: { recieverId },
    });
    return res.status(200).json(invitations);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const respondToInvitation = async (req, res) => {
  try {
    const { invitationId } = req.params;
    const { invitationStatus } = req.body;

    // Input Validation
    if (!invitationId || !invitationStatus) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const invitation = await Invitation.findByPk(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation Not Found" });
    }

    await invitation.update({ invitationStatus });

    return res
      .status(200)
      .json({ message: `Invitation ${invitationStatus} successfully` });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createInvitation,
  getInvitationsByRecieverId,
  respondToInvitation,
};
