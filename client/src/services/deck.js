import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API lấy tất cả deck theo user_id
export const getDecksByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/deck/user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch decks for user.' };
    }
};
// API tạo Deck
export const createDeck = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/deck`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to create deck.' };
    }
};
// API Cập nhật Deck
export const updateDeck = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/deck/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to update deck.' };
    }
}
// API Xóa deck
export const deleteDeck = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/deck/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to delete deck.' };
    }
}
