const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");

router.post("/", GroupController.createGroup);
router.get("/u/:userId", GroupController.getGroupsByUserId);
router.get("/g/:groupId", GroupController.getGroupByGroupId);
router.put("/a/g/:groupId", GroupController.addUserToGroup);
router.put("/r/g/:groupId", GroupController.removeUserFromGroup);

module.exports = router;
