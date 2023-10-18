const { Patient } = require("../models");

exports.registerNewPatient = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    gender,
    birth_date,
    telephone_number,
    payment_category,
  } = req.body;

  console.log(req.body);
  try {
    const patientAlreadyExists = await Patient.findOne({
      where: { telephone_number: telephone_number },
    });
    if (patientAlreadyExists) {
      res.status(400).json({ message: "Patient already exists" });
    }
    const patient = await Patient.create({
      first_name,
      middle_name,
      last_name,
      gender,
      birth_date,
      telephone_number,
      payment_category,
    });
    res
      .status(201)
      .json({ data: patient, message: "Patient created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSinglePatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient Not Found" });
    }
    res.status(200).json({ data: patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({});
    if (patients === null) {
      return res.status(404).json({ message: "No Patient Found" });
    }
    res.status(200).json({ count: patients.length, data: patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePatientProfile = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    telephone_number,
    birth_date,
    payment_category,
  } = req.body;
  const { patient_id } = req.params;
  if (
    !first_name ||
    !last_name ||
    !telephone_number ||
    !birth_date ||
    !payment_category
  ) {
    throw new Error("Please Provide Valid Credentials");
  }
  const patient = await Patient.findOne({ where: { patient_id: patient_id } });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  patient.first_name = first_name;
  patient.middle_name = middle_name;
  patient.last_name = last_name;
  patient.telephone_number = telephone_number;
  patient.birth_date = birth_date;
  patient.payment_category = payment_category;

  await patient.save();
  res.status(200).json({ data: patient });
};
