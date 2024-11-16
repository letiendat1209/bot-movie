import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo season
export const createSeason = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/season`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create season." };
    }
}
// Hàm lấy tát cả season theo movie id
export const getSeasonsByMovieId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/season/${id}/movies`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch seasons for movie." };
    }
}
// Hàm xóa season 
export const deleteSeason = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/season/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to delete season." };
    }
}