import SentencePair from "../models/SentencePair";
import models from "../models";

// Lấy tất cả theo id_user
export const getSentencePairsByUserId = async (req, res) => {
    try {
        const sentencepairs = await SentencePair.findAll({
            where: { user_id: req.params.id },
        });
        res.status(200).json(sentencepairs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Tạo một SentencePair
export const createSentencePair = async (req, res) => {
    try {
        const sentencepair = await SentencePair.create(req.body);
        res.status(200).json(sentencepair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// cập nhật một SentencePair
export const updateSentencePair = async (req, res) => {
    try {
        const sentencepair = await SentencePair.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(sentencepair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// xóa một SentencePair
export const deleteSentencePair = async (req, res) => {
    try {
        const sentencepair = await SentencePair.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json(sentencepair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}