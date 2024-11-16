import { useState } from 'react';
import { Bell, Search, User, Settings, HelpCircle, ChevronDown } from 'lucide-react';

const TopHeader = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Đọc user data an toàn hơn
    const getUserData = () => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    };

    const userData = getUserData();
    return (
        <div className="w-full bg-white shadow-md">
            <div className="flex h-16 items-center justify-between px-4">
                {/* Left side - Search */}
                <div className="flex flex-1 items-center">
                    <div className="relative w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Right side - Icons & Profile */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="relative rounded-full p-2 hover:bg-gray-100">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            3
                        </span>
                    </button>

                    {/* Settings */}
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <Settings className="h-6 w-6 text-gray-600" />
                    </button>

                    {/* Help */}
                    <button className="rounded-full p-2 hover:bg-gray-100">
                        <HelpCircle className="h-6 w-6 text-gray-600" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-3 rounded-lg p-2 hover:bg-gray-100"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <div className="hidden text-left md:block">
                                <div className="text-sm font-semibold text-gray-700">
                                    {userData?.first_name + ' ' + userData?.last_name}
                                </div>
                                <div className="text-xs text-gray-500">{userData?.role}</div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg">
                                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Thông tin cá nhân
                                </a>
                                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Cài đặt tài khoản
                                </a>
                                <hr className="my-1" />
                                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    Đăng xuất
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
