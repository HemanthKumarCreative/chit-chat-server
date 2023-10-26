const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, GroupController.createGroup);
router.get("/u/:userId", checkAuthorization, GroupController.getGroupsByUserId);
router.get(
  "/g/:groupId",
  checkAuthorization,
  GroupController.getGroupByGroupId
);
router.put("/a/g/:groupId", checkAuthorization, GroupController.addUserToGroup);
router.put(
  "/r/g/:groupId",
  checkAuthorization,
  GroupController.removeUserFromGroup
);

module.exports = router;
