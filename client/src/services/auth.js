import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Đăng ký (Sign up)
export const signUp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signUp`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
// Đăng nhập (Sign in)
export const signIn = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signIn`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}