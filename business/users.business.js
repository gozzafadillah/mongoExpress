const bcryptjs = require("bcryptjs");
const UserRepository = require("../repository/user.repo");
const { generateAccessToken, verifyToken } = require("../utils/jwt.utils");

class UserBusiness {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser(user) {
    try {
      user.password = bcryptjs.hashSync(user.password, 10);
      const result = await this.userRepository.createUser(user);
      return result;
    } catch (error) {
      return error;
    }
  }
  async login(user) {
    try {
      const result = await this.userRepository.verifyUser(user);
      if (result instanceof Error) {
        return Error(result.message);
      }
      const token = generateAccessToken({ email: result.email });
      return { result: { name: result.name, email: result.email }, token };
    } catch (error) {
      return error;
    }
  }
  async getProfile(token) {
    try {
      const user = verifyToken(token);
      const result = await this.userRepository.getUserByEmail(user.email);
      return result;
    } catch (error) {
      return error;
    }
  }

  async changePassword(token, user) {
    try {
      const userToken = verifyToken(token);
      const result = await this.userRepository.getUserByEmail(userToken.email);
      user.newPassword = bcryptjs.hashSync(user.newPassword, 10);
      const newPass = await this.userRepository.changePassword({
        email: userToken.email,
        password: user.newPassword,
      });
      return newPass;
    } catch (error) {
      return error;
    }
  }
}
module.exports = UserBusiness;
