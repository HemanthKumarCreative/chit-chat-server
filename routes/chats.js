const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/ChatController");

router.post("/", ChatController.createChat);
router.get("/", ChatController.getChats);

module.exports = router;
