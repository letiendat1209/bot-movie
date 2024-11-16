import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImages = async (file) => {
    try {
        const formData = new FormData();
        formData.append("thumbnail", file);
        const response = await axios.post(`${API_URL}/upload/upload-image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to upload file." };
    }
}

export const uploadSubtitles = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`${API_URL}/upload-subtitle`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to upload file." };
    }
}