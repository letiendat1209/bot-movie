import Subtitle from "../models/Subtitle";

// Tạo Subtitle
export const createSubtitle = async (req, res) => {
  try {
    const data = await Subtitle.create(req.body);
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Create subtitle successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

// Lấy danh sách Subtitle theo id episode
export const getSubtitleByEpisodeId = async (req, res) => {
  try {
    const data = await Subtitle.findAll({
      where: { episode_id: req.params.id },
    });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: `Get subtitle by episode id ${req.params.id} successfully`,
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// Cập nhật subtitle
export const updateSubtitle = async (req, res) => {
  try {
    const data = await Subtitle.update(req.body, {
      where: { id: req.params.id },
    });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Update subtitle successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

// Xóa subtitle
export const deleteSubtitle = async (req, res) => {
  try {
    const data = await Subtitle.destroy({ where: { id: req.params.id } });
    if (!data) {
      throw new Error("Failed !");
    }
    return res.status(200).json({
      message: "Delete subtitle successfully",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
