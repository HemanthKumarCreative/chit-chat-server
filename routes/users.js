const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:userId", UserController.getUserByUserId);
router.put("/update-user-groups", UserController.updateUserGroups);

module.exports = router;
