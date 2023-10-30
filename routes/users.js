const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post("/", checkAuthorization, UserController.createUser);
router.get("/", checkAuthorization, UserController.getUsers);
router.get("/:userId", checkAuthorization, UserController.getUserByUserId);
router.put(
  "/update-user-groups",
  checkAuthorization,
  UserController.updateUserGroups
);
router.put(
  "/remove-user-groups",
  checkAuthorization,
  UserController.removeUserGroups
);

module.exports = router;
