const express = require("express");
const router = express.Router();
const InvitationController = require("../controllers/InvitationController");

router.post("/", InvitationController.createInvitation);
router.get("/:recieverId", InvitationController.getInvitationsByRecieverId);
router.put("/:invitationId", InvitationController.respondToInvitation);

module.exports = router;
