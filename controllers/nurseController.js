const { Nurse } = require("../models");

exports.createNurse = async (req, res) => {
  const { first_name, last_name, email, telephone_number, password } = req.body;
  try {
    const nurseAlreadyExists = await Nurse.findOne({ where: { email: email } });
    if (nurseAlreadyExists) {
      res.status(400).json({ message: "Nurse Already Exists" });
    }
    const nurse = await Nurse.create({
      first_name,
      last_name,
      email,
      telephone_number,
      password,
    });
    res.status(201).json({ message: "Nurse Created", nurse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleNurse = async (req, res) => {
  const { email } = req.params;
  try {
    const nurse = await Nurse.findOne({ where: { email: email } });
    if (!nurse) {
      res.status(404).json({ message: "Nurse Not Found" });
    }
    res.status(200).json({ data: nurse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
