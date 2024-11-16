import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Hàm lấy tất cả movies
export const getAllMovies = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/movies`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch movies." };
    }
};

// Hàm lấy movies theo id
export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/movies/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch movie details." };
    }
};

// API lấy thông tin mùa của phim
export const getSeasonsByMovieId = async (idMovie) => {
    try {
        const response = await axios.get(`${API_URL}/movies/${idMovie}/seasons`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch seasons for movie." };
    }
};
// API sửa thông tin phim
export const updateMovie = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/movies/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to update movie." };
    }
}
// API lấy thông tin chi tiết tập phim
export const getEpisodeDetails = async (idMovie, idSeason, idEpisode) => {
    try {
        const response = await axios.get(`${API_URL}/movies/${idMovie}/seasons/${idSeason}/episodes/${idEpisode}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch episode details." };
    }
};
// API tạo movies
export const createMovies = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/movies`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create movie." };
    }
}