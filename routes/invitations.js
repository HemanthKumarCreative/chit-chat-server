const express = require("express");
const router = express.Router();
const InvitationController = require("../controllers/InvitationController");

router.post("/", InvitationController.createInvitation);
router.get("/:userId", InvitationController.getInvitations);
router.put("/accept/:invitationId", InvitationController.acceptInvitation);
router.put("/reject/:invitationId", InvitationController.rejectInvitation);

module.exports = router;
