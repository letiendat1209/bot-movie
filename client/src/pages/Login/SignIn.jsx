/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { saveUserToLocalStorage } from '~/utils/localStorage';
import { signIn } from '~/services/auth';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onToggleAuth }) => {
    const [formData, setFormData] = useState({
        email: 'testuser1@gmail.com',
        password: 'admin123',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const nav = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await signIn(formData);
            saveUserToLocalStorage({
                ...response.user,
                email: formData.email,
                token: response.token,
            });

            toast.success('Đăng nhập thành công! Welcome back!');
            nav('/');
        } catch (err) {
            toast.error(err.message || 'An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-left text-4xl font-bold text-blue-500">Sign In To BOT MOVIE</h1>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
            </form>

            <p className="text-gray-400">
                Not a member?{' '}
                <button onClick={onToggleAuth} className="text-blue-500 hover:text-blue-400 focus:outline-none">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default SignIn; // Đảm bảo có export default
