import Episode from "../models/Episode";
import models from "../models";
// Tạo Episode mới
export const createEpisode = async (req, res) => {
  try {
    const data = await Episode.create(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Create episode successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy danh sách Episode
export const getAllEpisodes = async (req, res) => {
  try {
    const data = await Episode.findAll(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Get all episodes successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy danh sách episode theo Season ID
export const getAllEpisodesBySeasonId = async (req, res) => {
  try {
    const data = await Episode.findAll({ where: { season_id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: `Get all episodes by season id ${req.params.id} successfully`,
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy chi tiết episode
export const getEpisodeById = async (req, res) => {
  const { id } = req.params;

  try {
    const episode = await models.Episode.findOne({
      where: { id: id },
      include: [
        {
          model: models.Season,
          as: "season",
          attributes: ["id", "season_number", "title"],
          include: [
            {
              model: models.Movie,
              as: "movie",
              attributes: ["id", "title", "description","poster","thumbnail","total_views","upvote","type"],
              include: [
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
              ]
            },
          ],
        },
      ],
      attributes: ["id", "episode_number", "title", "duration", "video_url", "subtitle_url","overview"],
    });

    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    // Extract movie and season IDs from associations
    const { season } = episode;
    const movie = season?.movie;
    // Create a response object including movie and season IDs
    const response = {
      episode_id: episode.id,
      movie_id: movie?.id,
      season_id: season?.id,

      episode_number: episode.episode_number,
      title: episode.title,
      duration: episode.duration,
      video_url: episode.video_url,
      subtitle_url: episode.subtitle_url,
      overview: episode.overview,

      movie_title: movie?.title,
      movie_description: movie?.description,
      movie_thumbnail: movie?.thumbnail,
      movie_poster: movie?.poster,
      movie_total_view: movie?.total_views,
      movie_upvote: movie?.upvote,
      movie_type: movie?.type,

      season_number: season?.season_number,
      season_title: season?.title,

      movie_genres: movie?.genres,
      movie_tags: movie?.tags,
    };

    return res.status(200).json({
      message: "Episode details fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching episode details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// Cập nhật episode
export const updateEpisode = async (req, res) => {
  try {
    const data = await Episode.update(req.body, {
      where: { id: req.params.id },
    });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Update episode successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Xóa Episode
export const deleteEpisode = async (req, res) => {
  try {
    const data = await Episode.destroy({ where: { id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Delete episode successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
