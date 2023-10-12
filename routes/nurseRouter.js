const express = require("express");
const router = express.Router();
const {
  createNurse,
  getSingleNurse,
  loginNurse,
} = require("../controllers/nurseController");

router.route("/login").post(loginNurse);

router.route("/register").post(createNurse);

router.route("/:email").get(getSingleNurse);

module.exports = router;
