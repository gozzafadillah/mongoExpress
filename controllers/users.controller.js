const UserBusiness = require("../business/users.business");

class UserController {
  constructor() {
    this.userBusiness = new UserBusiness();
  }
  async createUser(req, res) {
    try {
      const user = await this.userBusiness.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async login(req, res) {
    try {
      const user = await this.userBusiness.login(req.body);
      if (user instanceof Error) {
        res.status(401).json({ error: user.message });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getProfile(req, res) {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const token = req.headers.authorization.split(" ")[1];
      const user = await this.userBusiness.getProfile(token);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async changePassword(req, res) {
    try {
      if (!req.headers.authorization) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const token = req.headers.authorization.split(" ")[1];
      const result = await this.userBusiness.changePassword(token, req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
