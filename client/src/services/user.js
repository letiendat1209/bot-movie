import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// API lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch users.' };
    }
};
// Api lấy thông tin người dùng theo Id
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to fetch user.' };
    }
};
// Cập nhật thông tin người dùng
export const updateUserById = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/user/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Failed to update user.' };
    }
}
