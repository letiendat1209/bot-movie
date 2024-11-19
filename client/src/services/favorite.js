import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo favorite
export const createFavorite = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/favorite`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to create favorite.' };
    }
};
// API lấy FavoritecountbyMovieId trả về bộ phim đó
export const getFavoriteCountByMovieId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/favorite/movie/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch favorite count.' };
    }
}
// API lấy tất cả favorite theo user_id
export const getFavoritesByUserId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/favorite/user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch favorites for user.' };
    }
};
// API Xóa favorite
export const deleteFavorite = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/favorite/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to delete favorite.' };
    }
};
