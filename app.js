// Import file konfigurasi MongoDB
require("./config/mongo.config");

const express = require("express");
const app = express();
app.use(express.json());
const { authenticateToken } = require("./utils/jwt.utils");

const port = 3000;

// Import file rute untuk movies
const setupMoviesRoutes = require("./routes/movies.route");

// Import file rute users
const setupUsersRoute = require("./routes/users.route");

// business
// Inisialisasi rute untuk users
const userRoute = setupUsersRoute();
// Inisialisasi rute untuk movies
const moviesRoutes = setupMoviesRoutes();

// Gunakan rute-rute yang telah didefinisikan
app.use("/api", moviesRoutes);
app.use("", userRoute);

// Jalankan aplikasi Express pada port yang ditentukan
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
