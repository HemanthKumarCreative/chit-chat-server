const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");

router.post("/u/:userId", GroupController.createGroup);
router.get("/u/:userId", GroupController.getGroups);
router.get("/g/:groupId", GroupController.getGroup);
router.put("/g/:groupId", GroupController.putGroup);

module.exports = router;
