const express = require("express");
const router = express.Router();
const SignupController = require("../controllers/SignUpController");

router.post("/", SignupController.signup);

module.exports = router;
