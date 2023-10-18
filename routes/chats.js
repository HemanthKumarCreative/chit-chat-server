const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/ChatController");

router.post("/:groupId", ChatController.createChat);
router.get("/:groupId", ChatController.getChats);

module.exports = router;
