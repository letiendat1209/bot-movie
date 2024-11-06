import { useState } from 'react';
import videoBg from '~/assets/video/endgame.mp4'; // Đường dẫn đến video nền
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
            {/* Video Background */}
            <video src={videoBg} autoPlay loop muted className="absolute left-0 top-0 h-full w-full object-cover opacity-50" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-md space-y-6 text-center">
                {isLogin ? <SignIn onToggleAuth={() => setIsLogin(false)} /> : <SignUp onToggleAuth={() => setIsLogin(true)} />}
            </div>
        </div>
    );
};

export default Auth;
