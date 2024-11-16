import Images from "../models/Images";

// Tạo images
export const createImage = async (req, res) => {
    try {
        const images = await Images.create(req.body);
        res.status(201).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy tất cả images có type nhập vào
export const getImagesByType = async (req, res) => {
    try {
        const images = await Images.findAll({ where: { type: req.params.type } });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy Images theo ID
export const getImageById = async (req, res) => {
    try {
        const image = await Images.findOne({ where: { id: req.params.id } });
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Cập nhật images
export const  updateImage = async (req, res) => {
    try {
        const image = await Images.findByPk(req.params.id);
        await image.update(req.body);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Xóa images
export const deleteImage = async (req, res) => {
    try {
        const image = await Images.findByPk(req.params.id);
        await image.destroy();
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}