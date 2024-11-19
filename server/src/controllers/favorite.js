import Favorite from "../models/Favorite";
import models from "../models";

// Tạo favorite mới check xem ngươfi
export const createFavorite = async (req, res) => {
  try {
    const { user_id, movie_id } = req.body;

    // Kiểm tra xem đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingFavorite = await Favorite.findOne({
      where: { user_id, movie_id },
    });

    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Bạn đã yêu thích phim này rồi!" });
    }

    // Nếu chưa tồn tại, tạo mới
    const favorite = await Favorite.create(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Lấy tất cả số lượng favorite của 1 bộ phim
export const getFavoriteCountByMovieId = async (req, res) => {
  try {
    const count = await Favorite.count({ where: { movie_id: req.params.id } });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Lấy tất cả favorite theo user_id
export const getFavoritesByUserId = async (req, res) => {
  try {
    const favorites = await models.Favorite.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: models.Movie,
          as: "movies",
          attributes: [
            "id",
            "title",
            "description",
            "release_date",
            "thumbnail",
            "rating",
            "type",
            "upvote",
            "total_views",
          ], // Các trường cần lấy từ Movie
        },
      ],
      attributes: ["id"], // Lấy id của bảng Favorite
    });

    // Lấy danh sách các mục yêu thích với thông tin cần thiết
    const favoriteItems = favorites.map((favorite) => ({
      id_favorite: favorite.id, // ID của mục yêu thích
      ...favorite.movies.toJSON(), // Lấy tất cả các thuộc tính của Movie
    }));

    res.status(200).json(favoriteItems); // Trả về danh sách mục yêu thích
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa favorite
export const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.id);
    await favorite.destroy();
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
