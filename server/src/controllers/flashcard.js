import Flashcard from "../models/Flashcard";

// Tạo flashcard
export const createFlashcard = async (req, res) => {
    try {
        const flashcard = await Flashcard.create(req.body);
        res.status(201).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// lấy flashcard theo id
export const getFlashcardById = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByPk(req.params.id);
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy tất cả  flashcard theo deck_id
export const getFlashcardsByDeckId = async (req, res) => {
    try {
        const flashcards = await Flashcard.findAll({ where: { deck_id: req.params.id } });
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Cấp nhật flashcard
export const updateFlashcard = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByPk(req.params.id);
        await flashcard.update(req.body);
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Xóa flashcard
export const deleteFlashcard = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByPk(req.params.id);
        await flashcard.destroy();
        res.status(200).json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
