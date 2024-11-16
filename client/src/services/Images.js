import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API tạo ảnh
export const createImage = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/images`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to create image." };
    }
}
// API lấy tất cả ảnh theo type
export const getImagesByType = async (type) => {
    try {
        const response = await axios.get(`${API_URL}/images/type/${type}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch images." };
    }
}
// API Lấy ảnh theo id
export const getImageById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/images/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch image." };
    }
}
//