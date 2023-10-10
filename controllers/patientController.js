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
  console.log("Hello");
};
