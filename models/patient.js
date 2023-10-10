"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_category: {
        type: DataTypes.ENUM("out of pocket", "reliance health insurance"),
      },
      patient_id: {
        type: DataTypes.INTEGER,
        defaultValue: function () {
          return Math.floor(100000 + Math.random() * 900000);
        },
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
