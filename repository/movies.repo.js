const movieModel = require("../models/movies.model");
class MoviesRepository {
  constructor() {
    this.movies = movieModel;
  }

  async createMovie(movie) {
    const data = new this.movies({ title: movie.title, year: movie.year });
    try {
      const result = await data.save();
      return result;
    } catch (error) {
      return error;
    }
  }

  async getMovies() {
    try {
      const movies = await this.movies.find();
      return movies;
    } catch (error) {
      return error;
    }
  }

  async getMovieById(id) {
    try {
      const movie = await this.movies.findById(id);
      return movie;
    } catch (error) {
      return error;
    }
  }

  async updateMovie(id, movie) {
    try {
      const option = { new: true };
      const result = await this.movies.findByIdAndUpdate(id, movie, option);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteMovie(id) {
    try {
      const movie = await this.movies.findByIdAndDelete(id);
      return movie;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MoviesRepository;
