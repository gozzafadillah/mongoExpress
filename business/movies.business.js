const MoviesRepository = require("../repository/movies.repo");

class MoviesBusiness {
  constructor() {
    this.moviesRepository = new MoviesRepository();
  }

  async getMovies() {
    return await this.moviesRepository.getMovies();
  }

  async getMovieById(id) {
    return await this.moviesRepository.getMovieById(id);
  }

  async createMovie(movie) {
    return await this.moviesRepository.createMovie(movie);
  }

  async updateMovie(id, movie) {
    return await this.moviesRepository.updateMovie(id, movie);
  }

  async deleteMovie(id) {
    return await this.moviesRepository.deleteMovie(id);
  }
}

module.exports = MoviesBusiness;
