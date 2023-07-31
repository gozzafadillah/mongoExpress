const MoviesBusiness = require("../business/movies.business");

class MoviesController {
  constructor() {
    this.moviesService = new MoviesBusiness();
  }

  async getMovies(_, res) {
    const movies = await this.moviesService.getMovies();
    return res.status(200).send(movies);
  }

  async getMovie(req, res) {
    const movie = await this.moviesService.getMovieById(req.params.id);
    return res.status(200).send(movie);
  }

  async createMovie(req, res) {
    const movie = await this.moviesService.createMovie(req.body);
    if (movie.error) {
      return res.status(400).send(movie);
    }
    return res.status(200).send(movie);
  }

  async updateMovie(req, res) {
    const movie = await this.moviesService.updateMovie(req.params.id, req.body);
    return res.status(200).send(movie);
  }

  async deleteMovie(req, res) {
    const movie = await this.moviesService.deleteMovie(req.params.id);
    return res.status(200).send(movie);
  }
}

module.exports = MoviesController;
