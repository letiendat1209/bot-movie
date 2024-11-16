import Movie from "../models/Movie";
import models from "../models";
// Tạo một movie mới
export const createMovies = async (req, res) => {
  try {
    // Kiểm tra xem req.body có đầy đủ các trường cần thiết không
    const { title, description, thumbnail, poster, trailer_url, release_date, duration, type } = req.body;

    if (!title || !description || !thumbnail || !poster || !type) {
      return res.status(400).json({
        message: "Required fields are missing. Please provide title, description, thumbnail, poster, and type.",
      });
    }

    const data = await Movie.create(req.body);
    return res.status(201).json({
      message: "Create movie successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message || "An error occurred while creating the movie",
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
          attributes: ["id", "season_number", "title", "poster_path"],
          include: [
            {
              model: models.Episode,
              as: "episodes",
              attributes: ["id", "episode_number", "title", "duration","subtitle_url"],
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
  const { idMovie } = req.params;
  const {
    title,
    description,
    thumbnail,
    poster,
    trailer_url,
    release_date,
    duration,
    rating,
    is_series,
    type,
    genres, // Thay đổi từ genreIds thành genres để nhận array của genre names
    tags,   // Thay đổi từ tagIds thành tags để nhận array của tag names
    actors  // Thay đổi từ actorIds thành actors để nhận array của actor names
  } = req.body;

  try {
    // Bắt đầu transaction
    const transaction = await models.sequelize.transaction();

    try {
      // Kiểm tra movie có tồn tại không
      const movie = await models.Movie.findByPk(idMovie);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      // Cập nhật thông tin cơ bản của movie
      await models.Movie.update(
        {
          title,
          description,
          thumbnail,
          poster,
          trailer_url,
          release_date,
          duration,
          rating,
          is_series,
          type,
          updated_at: new Date()
        },
        {
          where: { id: idMovie },
          transaction
        }
      );

      // Xử lý genres
      if (genres && Array.isArray(genres)) {
        const genreObjects = await Promise.all(genres.map(async (genreName) => {
          const [genre] = await models.Genre.findOrCreate({
            where: { name: genreName.trim() },
            transaction
          });
          return genre;
        }));
        await movie.setGenres(genreObjects, { transaction });
      }

      // Xử lý tags
      if (tags && Array.isArray(tags)) {
        const tagObjects = await Promise.all(tags.map(async (tagName) => {
          const [tag] = await models.Tag.findOrCreate({
            where: { name: tagName.trim() },
            transaction
          });
          return tag;
        }));
        await movie.setTags(tagObjects, { transaction });
      }

      // Xử lý actors
      if (actors && Array.isArray(actors)) {
        const actorObjects = await Promise.all(actors.map(async (actorName) => {
          const [actor] = await models.Actor.findOrCreate({
            where: { name: actorName.trim() },
            transaction
          });
          return actor;
        }));
        await movie.setActors(actorObjects, { transaction });
      }

      // Commit transaction
      await transaction.commit();

      // Lấy dữ liệu movie đã được cập nhật
      const updatedMovie = await models.Movie.findOne({
        where: { id: idMovie },
        include: [
          {
            model: models.Season,
            as: "seasons",
            attributes: ["id", "season_number", "title", "poster_path"],
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

      return res.status(200).json({
        message: "Movie updated successfully",
        data: updatedMovie
      });

    } catch (error) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();
      throw error;
    }

  } catch (error) {
    console.error("Error updating movie:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
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
// Lấy tất cả movies theo type
export const getMoviesByType = async (req, res) => {
  const { type } = req.params;

  try {
    // Tìm tất cả phim theo type và lấy các season, episode, genres, tags, và actors liên quan
    const movies = await models.Movie.findAll({
      where: { type },
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
          through: { attributes: [] }, // Loại bỏ bảng trung gian
        },
        {
          model: models.Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: { attributes: [] }, // Loại bỏ bảng trung gian
        },
        {
          model: models.Actor,
          as: "actors",
          attributes: ["id", "name"],
          through: { attributes: [] }, // Loại bỏ bảng trung gian
        },
      ],
    });

    // Kiểm tra nếu không tìm thấy phim
    if (!movies.length) {
      return res.status(404).json({ message: "No movies found for this type" });
    }

    // Trả về danh sách phim
    return res.status(200).json({
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    console.error("Error fetching movies by type:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
