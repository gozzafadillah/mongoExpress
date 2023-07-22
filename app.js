// Import file konfigurasi MongoDB
require("./config/mongo.config");

const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

// Import file rute untuk movies dan business logic
const setupMoviesRoutes = require("./routes/movies.route");
const MoviesBusiness = require("./business/movies.business");
const MoviesRepository = require("./repository/movies.repo");

// Inisialisasi objek repository, business logic, dan rute untuk movies
const moviesRepository = new MoviesRepository();
const moviesBusiness = new MoviesBusiness(moviesRepository);
const moviesRoutes = setupMoviesRoutes(moviesBusiness);

// Import file rute untuk users dan business logic
const setupUsersRoute = require("./routes/users.route");
const UserBusiness = require("./business/users.business");
const UserRepository = require("./repository/user.repo");
const { authenticateToken } = require("./utils/jwt.utils");

// Inisialisasi objek repository, business logic, dan rute untuk users
const userRepository = new UserRepository();
const userBusiness = new UserBusiness(userRepository);
const userRoute = setupUsersRoute(userBusiness);

// Gunakan rute-rute yang telah didefinisikan
app.use("/api", authenticateToken, moviesRoutes);
app.use("", userRoute);

// Jalankan aplikasi Express pada port yang ditentukan
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
