import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo subtitle
export const createSubtitle = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/subtitle`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create subtitle." };
    }
}
// API lấy subtitle theo episode id
export const getSubtitleByEpisodeId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/subtitle/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch subtitle." };
    }
}
// API update subtitle
export const updateSubtitle = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/subtitle/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to update subtitle." };
    }
}