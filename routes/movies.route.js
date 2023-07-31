const express = require("express");
const MoviesController = require("../controllers/movies.controller");
const { authenticateToken } = require("../utils/jwt.utils");

function setupMoviesRoutes() {
  const router = express.Router();
  const moviesController = new MoviesController();

  // Menghubungkan fungsi-fungsi ke endpoint-endpoint yang sesuai
  router.get(
    "/movies",
    authenticateToken,
    moviesController.getMovies.bind(moviesController)
  );
  router.get("/movies/:id", moviesController.getMovie.bind(moviesController));
  router.post(
    "/movies",
    authenticateToken,
    moviesController.createMovie.bind(moviesController)
  );
  router.put(
    "/movies/:id",
    moviesController.updateMovie.bind(moviesController)
  );
  router.delete(
    "/movies/:id",
    moviesController.deleteMovie.bind(moviesController)
  );

  return router;
}

module.exports = setupMoviesRoutes;
