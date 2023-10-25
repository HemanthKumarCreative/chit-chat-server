const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");

router.post("/", GroupController.createGroup);
router.get("/u/:userId", GroupController.getGroupsByUserId);
router.get("/g/:groupId", GroupController.getGroupByGroupId);
router.put("/g/:groupId", GroupController.addUserToGroup);

module.exports = router;
