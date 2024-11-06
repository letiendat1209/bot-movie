import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Hàm lấy tát cả season theo movie id
export const getSeasonsByMovieId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/season/${id}/movies`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch seasons for movie." };
    }
}