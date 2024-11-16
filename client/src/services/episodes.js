import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


// API tạo episode
export const createEpisode = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/episode`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create episode." };
    }
}
// Hàm lấy chi tiết tập phim theo id 
export const getEpisodeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/episode/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch episode details." };
    }
}
// Hàm lấy tất cả tập phim theo season id
export const getEpisodesBySeasonId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/episode/${id}/seasons`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch episodes." };
    }
}
// Hàm update tập phim
export const updateEpisode = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/episode/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to update episode." };
    }
}
