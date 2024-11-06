import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
// Hàm lấy tất cả tập phim theo id movies
