import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo flashcard
export const createFlashcard = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/flashcard`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to create flashcard.' };
    }
}
// API lấy flashcard theo id
export const getFlashcardById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/flashcard/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch flashcard.' };
    }
}
// API lấy flashcard theo deck_id
export const getFlashcardsByDeckId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/flashcard/deck/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch flashcards for deck.' };
    }
}
// API cập nhật flashcard
export const updateFlashcard = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/flashcard/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to update flashcard.' };
    }
}
// API xóa flashcard
export const deleteFlashcard = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/flashcard/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to delete flashcard.' };
    }
}