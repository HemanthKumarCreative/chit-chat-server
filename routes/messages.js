const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");

router.post("/:groupId", MessageController.createMessage);
router.get("/:groupId", MessageController.getMessagesByGroupId);

module.exports = router;
