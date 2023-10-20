const { Nurse } = require("../models");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

exports.createNurse = async (req, res) => {
  const { first_name, last_name, email, telephone_number, password } = req.body;
  try {
    const nurseAlreadyExists = await Nurse.findOne({ where: { email: email } });
    if (nurseAlreadyExists) {
      res.status(400).json({ message: "Nurse Already Exists" });
    }
    const user = await Nurse.create({
      first_name,
      last_name,
      email,
      telephone_number,
      password,
    });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ data: tokenUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginNurse = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please Provide Valid Credentials");
    }
    const user = await Nurse.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Nurse Does Not Exist" });
    }
    const passwordIsCorrect = await user.comparePassword(password);
    if (!passwordIsCorrect) {
      throw new Error("Please Provide Valid Credentials");
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ data: tokenUser });
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

exports.getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.findAll({});
    if (nurses === null) {
      return res.status(404).json({ message: "Nurses Not Found" });
    }
    res.status(200).json({ count: nurses.length, data: nurses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutNurse = async (req, res) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNurseProfile = async (req, res) => {
  const { first_name, last_name, email, telephone_number } = req.body;
  try {
    if (!first_name || !last_name || !email || !telephone_number) {
      throw new Error("Please Provide Valid Credentials");
    }
    const user = await Nurse.findOne({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ message: "Nurse Does Not Exist" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.telephone_number = telephone_number;
    await user.save();
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ data: tokenUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNursePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    if (!currentPassword || !newPassword) {
      throw new Error("Please Provide Valid Credentials");
    }
    const user = await Nurse.findOne({ where: { id: req.user.userId } });

    if (!user) {
      return res.status(404).json({ message: "Nurse Does Not Exist" });
    }
    user.set({ password: newPassword });
    res.status(200).json({ message: "New Password Saved" });
    await user.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNurse = async (req, res) => {
  const { id: nurseId } = req.params;
  try {
    const nurse = await Nurse.findOne({
      where: { id: nurseId },
    });
    if (!nurse) {
      return res.status(404).json({ message: "Nurse Not Found" });
    }

    await nurse.destroy();
    res.status(200).json({ message: "Nurse Deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
