"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Nurse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nurse.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
          isEmail: { message: "Please Provide A Valid Email Address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          min: 8,
        },
      },
      telephone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "nurse",
      },
    },
    {
      sequelize,
      modelName: "Nurse",
    }
  );

  Nurse.addHook("beforeSave", async function (nurse) {
    // const nurse = this;
    if (!nurse.changed("password")) return;
    const salt = await bcrypt.genSalt(10);
    nurse.password = await bcrypt.hashSync(nurse.password, salt);
  });

  Nurse.addHook("beforeCreate", async (nurse) => {
    nurse.first_name = nurse.first_name.toLowerCase();
    nurse.last_name = nurse.last_name.toLowerCase();
  });

  Nurse.prototype.comparePassword = async function (nursePassword) {
    const nurse = this;
    const isMatch = await bcrypt.compare(nursePassword, nurse.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    return isMatch;
  };

  return Nurse;
};
