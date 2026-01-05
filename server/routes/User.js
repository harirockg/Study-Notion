const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendotp,
} = require("../controllers/Auth");

router.post("/sendotp", sendotp);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
