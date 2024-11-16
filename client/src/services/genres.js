import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

//Api lấy tất cả genre
export const getAllGenres = async () => {
    try {
        const response = await axios.get(`${API_URL}/genre`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch genres." };
    }
}