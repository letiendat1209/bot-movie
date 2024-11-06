import Movie from "../models/Movie";
import models from "../models";
// Tạo một movie mới
export const createMovies = async (req, res) => {
  try {
    const data = await Movie.create(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Create movie successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy danh sách tất cả movies
export const getAllMovies = async (req, res) => {
  try {
    // Tìm tất cả phim và lấy các season, episode, genres, tags, và actors liên quan
    const movies = await models.Movie.findAll({
      include: [
        {
          model: models.Season,
          as: "seasons",
          attributes: ["id", "season_number", "title"],
          include: [
            {
              model: models.Episode,
              as: "episodes",
              attributes: ["id", "episode_number", "title", "duration"],
            },
          ],
        },
        {
          model: models.Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: models.Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: models.Actor,
          as: "actors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    // Trả về danh sách phim
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Lỗi lấy thông tin phim:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Lấy một movie theo ID
export const getMovieById = async (req, res) => {
  const { idMovie } = req.params;

  try {
    // Tìm phim theo ID và lấy các season, episode, genres và tags liên quan
    const movie = await models.Movie.findOne({
      where: { id: idMovie },
      include: [
        {
          model: models.Season,
          as: "seasons",
          attributes: ["id", "season_number", "title","poster_path"],
          include: [
            {
              model: models.Episode,
              as: "episodes",
              attributes: ["id", "episode_number", "title", "duration"],
            },
          ],
        },
        {
          model: models.Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: { attributes: [] }, // loại bỏ bảng trung gian
        },
        {
          model: models.Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] }, // loại bỏ bảng trung gian
        },
        {
          model: models.Actor,
          as: "actors",
          attributes: ["id", "name"],
          through: { attributes: [] }, // loại bỏ bảng trung gian
        },
      ],
    });

    // Kiểm tra nếu không tìm thấy phim
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Trả về dữ liệu phim
    return res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Lấy thông tin mùa của phim
export const getSeasonsByMovieId = async (req, res) => {
  const { idMovie } = req.params;

  try {
    const movie = await models.Movie.findOne({
      where: { id: idMovie },
      include: [
        {
          model: models.Season,
          as: "seasons",
          attributes: ["id", "season_number", "title"],
          include: [
            {
              model: models.Episode,
              as: "episodes",
              attributes: ["id", "episode_number", "title", "duration"],
            },
          ],
        },
      ],
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({
      message: "Seasons fetched successfully",
      data: movie.seasons,
    });
  } catch (error) {
    console.error("Error fetching seasons for movie:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Lấy thông tin chi tiết của một tập phim
export const getEpisodeDetails = async (req, res) => {
  const { idMovie, idSeason, idEpisode } = req.params;

  try {
    const episode = await models.Episode.findOne({
      where: { id: idEpisode },
      include: [
        {
          model: models.Season,
          as: "season",
          attributes: ["id", "season_number", "title"],
          where: { id: idSeason },
          include: [
            {
              model: models.Movie,
              as: "movie",
              attributes: ["id", "title"],
              where: { id: idMovie },
            },
          ],
        },
      ],
      attributes: ["id", "episode_number", "title", "duration", "video_url"],
    });

    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    return res.status(200).json({
      message: "Episode details fetched successfully",
      data: episode,
    });
  } catch (error) {
    console.error("Error fetching episode details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Cập nhật movie
export const updateMovies = async (req, res) => {
  try {
    const data = await Movie.update(req.body, { where: { id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Update movie successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Xóa movie
export const deleteMovies = async (req, res) => {
  try {
    const data = await Movie.destroy({ where: { id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Delete movie successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy danh sách các phim từ tên 1 genre
export const getMoviesByGenre = async (req, res) => {
  const { genreName } = req.params;

  try {
    // Tìm các phim theo tên của genre
    const movies = await models.Movie.findAll({
      include: [
        {
          model: models.Genre,
          as: "genres",
          attributes: ["id", "name"],
          where: { name: genreName }, // Lọc theo tên genre
          through: { attributes: [] },
        },
        {
          model: models.Season,
          as: "seasons",
          attributes: ["id", "season_number", "title"],
          include: [
            {
              model: models.Episode,
              as: "episodes",
              attributes: ["id", "episode_number", "title", "duration"],
            },
          ],
        },
        {
          model: models.Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: models.Actor,
          as: "actors",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    // Kiểm tra nếu không tìm thấy phim
    if (!movies.length) {
      return res
        .status(404)
        .json({ message: "No movies found for this genre" });
    }

    // Trả về danh sách phim
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
