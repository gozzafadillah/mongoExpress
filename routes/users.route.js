const UserController = require("../controllers/users.controller");
const express = require("express");

function setupUsersRoute(usersBusiness) {
  const router = express.Router();
  const userController = new UserController(usersBusiness);
  router.post("/users", userController.createUser.bind(userController));
  router.post("/login", userController.login.bind(userController));
  router.get("/profile", userController.getProfile.bind(userController));
  router.post(
    "/change-password",
    userController.changePassword.bind(userController)
  );
  return router;
}

module.exports = setupUsersRoute;
