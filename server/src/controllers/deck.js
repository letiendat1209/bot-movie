import Deck from "../models/Deck";

// Thêm deck
export const createDeck = async (req, res) => {
    try {
        const deck = await Deck.create(req.body);
        res.status(201).json(deck);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy tất cả deck theo user_id
export const getDecksByUserId = async (req, res) => {
    try {
        const decks = await Deck.findAll({ where: { user_id: req.params.id } });
        res.status(200).json(decks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy deck theo id
export const getDeckById = async (req, res) => {
    try {
        const deck = await Deck.findByPk(req.params.id);
        res.status(200).json(deck);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// cập nhật deck
export const updateDeck = async (req, res) => {
    try {
        const deck = await Deck.findByPk(req.params.id);
        await deck.update(req.body);
        res.status(200).json(deck);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Xóa deck theo id
export const deleteDeck = async (req, res) => {
    try {
        const deck = await Deck.findByPk(req.params.id);
        await deck.destroy();
        res.status(200).json({ message: "Deck deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}