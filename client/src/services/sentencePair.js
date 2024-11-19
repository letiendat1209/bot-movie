import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo sentence pair
export const createSentencePair = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/sentencePair`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create sentence pair." };
    }
}
// API lấy sentencePairs theo user_id
export const getSentencePairsByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/sentencePair/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch sentence pairs for user." };
    }
}
// API update sentence pair
export const updateSentencePair = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/sentencePair/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to update sentence pair." };
    }
}
// API xóa sentence pair
export const deleteSentencePair = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/sentencePair/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to delete sentence pair." };
    }
}