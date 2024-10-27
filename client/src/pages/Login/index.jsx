import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import videoBg from '~/assets/video/endgame.mp4'; // Đường dẫn đến video nền

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
            {/* Video Background */}
            <video src={videoBg} autoPlay loop muted className="absolute left-0 top-0 h-full w-full object-cover opacity-50" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md space-y-6 text-center">
                {/* Header */}
                <div className="space-y-2">
                    {!isLogin && <h2 className="text-md text-left font-bold text-gray-300">START FOR FREE</h2>}
                    <h1 className="text-left text-4xl font-bold text-blue-500">{isLogin ? 'Sign In To BOT MOVIE' : 'Create Account'}</h1>
                </div>

                {/* Social Login */}
                {/* <div className="flex justify-center gap-4">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-gray-100">
                        <i className="fa-brands fa-google"></i>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-gray-100">
                        <i className="fa-brands fa-facebook-f"></i>
                    </button>
                </div> */}

                {/* Divider */}
                {/* <p className="text-md text-gray-300">or use your email account:</p> */}

                {/* Form */}
                <form className="space-y-4">
                    {/* Name fields - only show for register */}
                    {!isLogin && (
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-lg bg-gray-600 px-4 py-3 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLogin ? 'SIGN IN' : 'REGISTER'}
                    </button>
                </form>

                {/* Toggle Auth Mode */}
                <p className="text-gray-400">
                    {isLogin ? 'Not a member?' : 'Already a member?'}{' '}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:text-blue-400 focus:outline-none">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
