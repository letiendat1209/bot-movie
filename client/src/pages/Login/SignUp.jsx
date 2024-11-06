/* eslint-disable react/prop-types */
import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { saveUserToLocalStorage } from '~/utils/localStorage';
import { signUp } from '~/services/auth';

const SignUp = ({ onToggleAuth }) => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (formData.password.length < 6) {
            toast.warning('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await signUp(formData);
            saveUserToLocalStorage({
                email: formData.email,
                username: formData.username,
                first_name: formData.first_name,
                last_name: formData.last_name,
                token: response.token,
            });

            // Hiện thông báo thành công
            toast.success('Tạo tài khoản thành công! bạn sẽ được chuyển sang trang đăng nhập');

            // Chờ một khoảng thời gian trước khi chuyển hướng
            setTimeout(() => {
                const queryParams = new URLSearchParams({
                    email: formData.email,
                    username: formData.username,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                }).toString();

                window.location.href = `/auth?${queryParams}`;
            }, 2000); // Chờ 2 giây trước khi chuyển hướng
        } catch (err) {
            toast.error(err.message || 'An error occurred during sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-md text-left font-bold text-gray-300">START FOR FREE</h2>
                <h1 className="text-left text-4xl font-bold text-blue-500">Create Account</h1>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="First name"
                            className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                        <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="relative flex-1">
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Last name"
                            className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                        <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

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
                    {loading ? 'REGISTERING...' : 'REGISTER'}
                </button>
            </form>

            <p className="text-gray-400">
                Already a member?{' '}
                <button onClick={onToggleAuth} className="text-blue-500 hover:text-blue-400 focus:outline-none">
                    Sign In
                </button>
            </p>
        </div>
    );
};

export default SignUp;
