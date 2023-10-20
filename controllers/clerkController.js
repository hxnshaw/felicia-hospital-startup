const { Clerk } = require("../models");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

exports.createClerk = async (req, res) => {
  const { first_name, last_name, email, telephone_number, password } = req.body;
  try {
    const clerkAlreadyExists = await Clerk.findOne({ where: { email: email } });
    if (clerkAlreadyExists) {
      res.status(400).json({ message: "Clerk Already Exists" });
    }
    const user = await Clerk.create({
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

exports.getSingleClerk = async (req, res) => {
  const { email } = req.params;
  try {
    const clerk = await Clerk.findOne({ where: { email: email } });
    if (!clerk) {
      res.status(404).json({ message: "Clerk Not Found" });
    }
    res.status(200).json({ data: clerk });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginClerk = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Please Provide Valid Credentials");
    }

    const user = await Clerk.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Clerk Does Not Exist" });
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

exports.logoutClerk = async (req, res) => {
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

exports.getAllClerks = async (req, res) => {
  try {
    const clerks = await Clerk.findAll({
      attributes: { exclude: ["password"] },
    });
    if (clerks === null) {
      return res.status(404).json({ message: "Clerks not found" });
    }
    res.status(200).json({ count: clerks.length, data: clerks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClerkProfile = async (req, res) => {
  const { first_name, last_name, email, telephone_number } = req.body;

  try {
    if (!first_name || !last_name || !email || !telephone_number) {
      throw new Error("Please Provide Valid Credentials");
    }
    const user = await Clerk.findOne({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ message: "clerk not found" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.telephone_number = telephone_number;

    await user.save();
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(200).json({ message: "Success", tokenUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClerkPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    if (!currentPassword || !newPassword) {
      throw new Error("Please Provide Valid Credentials");
    }
    const user = await Clerk.findOne({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ message: "Clerk Does Not Exist" });
    }
    user.set({ password: newPassword });
    await user.save();
    res.status(200).json({ message: "New Password Saved!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClerk = async (req, res) => {
  const { id: clerkId } = req.params;
  try {
    const clerk = await Clerk.findOne({
      where: { id: clerkId },
    });
    if (!clerk) {
      return res.status(404).json({ message: "Clerk Not Found" });
    }

    await clerk.destroy();
    res.status(200).json({ message: "Clerk Deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
