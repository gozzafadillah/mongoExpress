const { Error } = require("mongoose");
const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const CustomUserError = require("../utils/error.utils");

class UserRepository {
  constructor() {
    this.users = userModel;
  }
  async createUser(user) {
    const data = new this.users({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    try {
      const result = await data.save();
      return result;
    } catch (error) {
      return error;
    }
  }
  async verifyUser(user) {
    try {
      const result = await this.users.findOne({ email: user.email });
      if (result) {
        const isMatch = bcryptjs.compareSync(user.password, result.password);
        if (isMatch) {
          return result;
        } else {
          throw new CustomUserError("Password is incorrect");
        }
      } else {
        throw new CustomUserError("Email is incorrect");
      }
    } catch (error) {
      return error;
    }
  }
  async getUserByEmail(email) {
    try {
      const result = await this.users.findOne({ email });
      if (!result) {
        return false;
      }
      return {
        result: {
          name: result.name,
          email: result.email,
          password: result.password,
        },
      };
    } catch (error) {
      return error;
    }
  }
  async changePassword(user) {
    try {
      const result = await this.users.updateOne(
        { email: user.email },
        { $set: { password: user.password } }
      );
      return result;
    } catch (error) {}
  }
}

module.exports = UserRepository;
