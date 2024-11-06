import Season from "../models/Season";
// Tạo Season mới
export const createSeason = async (req, res) => {
  try {
    const data = await Season.create(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Create season successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy danh sách tất cả season
export const getAllSeasons = async (req, res) => {
  try {
    const data = await Season.findAll(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Get all seasons successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy season theo ID season
export const getSeasonById = async (req, res) => {
  try {
    const data = await Season.findByPk(req.params.id);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Get season successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Lấy season theo ID movie
export const getSeasonByMovieId = async (req, res) => {
  try {
    const data = await Season.findAll({ where: { movie_id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: `Get season by movie id ${req.params.id} successfully`,
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Cập nhật season
export const updateSeason = async (req, res) => {
  try {
    const data = await Season.update(req.body, {
      where: { id: req.params.id },
    });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Update season successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Xóa season
export const deleteSeason = async (req, res) => {
  try {
    const data = await Season.destroy({ where: { id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Delete season successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
