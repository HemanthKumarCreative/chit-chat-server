const express = require("express");
const router = express.Router();
const InvitationController = require("../controllers/InvitationController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, InvitationController.createInvitation);
router.get(
  "/:recieverId",
  checkAuthorization,
  InvitationController.getInvitationsByRecieverId
);
router.put(
  "/:invitationId",
  checkAuthorization,
  InvitationController.respondToInvitation
);

module.exports = router;
