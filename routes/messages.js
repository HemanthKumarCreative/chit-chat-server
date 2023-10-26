const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/:groupId", checkAuthorization, MessageController.createMessage);
router.get(
  "/:groupId",
  checkAuthorization,
  MessageController.getMessagesByGroupId
);

module.exports = router;
