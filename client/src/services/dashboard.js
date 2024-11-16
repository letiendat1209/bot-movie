import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getTotalViews = async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/totalViews`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch total views." };
    }
}
export const getTotalUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/user`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: "Failed to fetch total users." };
    }
}