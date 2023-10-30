const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/MessageController");
const { checkAuthorization } = require("../controllers/AuthController");
const multer = require("multer");
const upload = multer({ dest: "../uploads/" });

router.post(
  "/:groupId",
  checkAuthorization,
  upload.single("file"),
  MessageController.createMessage
);
router.get(
  "/:groupId",
  checkAuthorization,
  MessageController.getMessagesByGroupId
);

module.exports = router;
