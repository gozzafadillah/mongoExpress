const express = require("express");
const MoviesController = require("../controllers/movies.controller");

function setupMoviesRoutes(moviesBusiness) {
  const router = express.Router();
  const moviesController = new MoviesController(moviesBusiness);

  // Menghubungkan fungsi-fungsi ke endpoint-endpoint yang sesuai
  router.get("/movies", moviesController.getMovies.bind(moviesController));
  router.get("/movies/:id", moviesController.getMovie.bind(moviesController));
  router.post("/movies", moviesController.createMovie.bind(moviesController));
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
