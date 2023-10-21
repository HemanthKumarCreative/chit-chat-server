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

const getInvitationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Input Validation
    if (!userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const invitations = await Invitation.findAll({
      where: { userId },
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
    const { status } = req.body;

    // Input Validation
    if (!invitationId || !status) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const invitation = await Invitation.findByPk(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation Not Found" });
    }

    await invitation.update({ invitationStatus: status });

    return res
      .status(200)
      .json({ message: `Invitation ${status} successfully` });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createInvitation,
  getInvitationsByUserId,
  respondToInvitation,
};
