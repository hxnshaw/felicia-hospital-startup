const express = require("express");
const router = express.Router();
const {
  registerNewPatient,
  getSinglePatient,
} = require("../controllers/patientController");

router.route("/register").post(registerNewPatient);

module.exports = router;
