const express = require("express");
const router = express.Router();
const {
  registerNewPatient,
  getSinglePatient,
  getAllPatients,
  updatePatientProfile,
} = require("../controllers/patientController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/:patient_id")
  .get(
    authenticateUser,
    authorizePermissions("clerk", "nurse"),
    getSinglePatient
  );

router
  .route("/:patient_id")
  .put(
    authenticateUser,
    authorizePermissions("clerk", "nurse"),
    updatePatientProfile
  );

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("clerk", "nurse"),
    getAllPatients
  );

router
  .route("/register")
  .post(
    authenticateUser,
    authorizePermissions("clerk", "nurse"),
    registerNewPatient
  );

module.exports = router;
