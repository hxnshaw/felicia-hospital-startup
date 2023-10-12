"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Clerk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clerk.init(
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "clerk",
      },
    },
    {
      sequelize,
      modelName: "Clerk",
    }
  );

  Clerk.addHook("beforeSave", async function (clerk) {
    if (!clerk.changed("password")) return;
    const salt = await bcrypt.genSaltSync(10);
    clerk.password = await bcrypt.hashSync(clerk.password, salt);
  });

  Clerk.addHook("beforeCreate", async (clerk) => {
    clerk.first_name = clerk.first_name.toLowerCase();
    clerk.last_name = clerk.last_name.toLowerCase();
  });

  Clerk.prototype.comparePassword = async function (clerkPassword) {
    const clerk = this;
    const isMatch = await bcrypt.compare(clerkPassword, clerk.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }
    return isMatch;
  };
  return Clerk;
};
