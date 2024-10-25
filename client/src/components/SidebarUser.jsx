/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRound, UserRoundPen, Lock, Film, Heart, Eye, Power, BookA, Bell, ChartNoAxesColumn } from 'lucide-react'; // Import các icon cần dùng

function Sidebar({ isOpen, toggleSidebar }) {
    const [activeTab, setActiveTab] = useState('Thông tin'); // Quản lý tab đang mở

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 h-screen bg-black bg-opacity-50 transition-opacity ${
                    isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={toggleSidebar} // Khi ấn vào overlay sẽ đóng sidebar
            ></div>

            <div
                className={`fixed right-0 top-0 z-50 h-screen w-[300px] transform bg-[#1c1c1e] bg-opacity-50 text-white shadow-lg backdrop-blur-sm transition-transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 pt-2">
                    <div className="flex items-center justify-between">
                        <button onClick={toggleSidebar} className="text-2xl text-white hover:text-gray-400 focus:outline-none">
                            &times;
                        </button>
                        <img
                            src="https://avatarfiles.alphacoders.com/375/375863.jpeg"
                            alt="Avatar"
                            className="mr-6 h-10 w-10 rounded-full"
                        />
                    </div>
                    <h2 className="text-md my-4 font-semibold">Chào datvipprono1!</h2>

                    {/* Tabs */}
                    <div className="flex space-x-4">
                        <span
                            className={`cursor-pointer border-b-2 p-2 text-sm ${
                                activeTab === 'Thông tin' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-white'
                            } hover:text-cyan-500`}
                            onClick={() => setActiveTab('Thông tin')}
                        >
                            Thông tin
                        </span>
                        <span
                            className={`cursor-pointer border-b-2 p-2 text-sm ${
                                activeTab === 'Thông báo' ? 'border-cyan-500 text-cyan-500' : 'border-transparent text-white'
                            } hover:text-cyan-500`}
                            onClick={() => setActiveTab('Thông báo')}
                        >
                            Thông báo
                        </span>
                    </div>
                    <hr className="mb-4 border-gray-500" />

                    {activeTab === 'Thông tin' && (
                        <nav className="space-y-4">
                            {/* Phần 1 */}
                            <div className="space-y-2">
                                <Link to="/profile" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <UserRound className="h-5 w-5" />
                                    <span className="pl-2 font-light">Trang cá nhân</span>
                                </Link>
                                <Link to="/edit-info" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <UserRoundPen className="h-5 w-5" />
                                    <span className="pl-2 font-light">Sửa thông tin</span>
                                </Link>
                                <Link to="/change-password" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Lock className="h-5 w-5" />
                                    <span className="pl-2 font-light">Đổi mật khẩu</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 2 */}
                            <div className="space-y-2">
                                <Link to="/watched-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Film className="h-5 w-5" />
                                    <span className="pl-2 font-light">Phim đã xem</span>
                                </Link>
                                <Link to="/liked-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Heart className="h-5 w-5" />
                                    <span className="pl-2 font-light">Phim đã thích</span>
                                </Link>
                                <Link to="/following-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Eye className="h-5 w-5" />
                                    <span className="pl-2 font-light">Phim đang theo dõi</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 3 */}
                            <div className="space-y-2">
                                <Link to="/pairs" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <BookA className="h-5 w-5" />
                                    <span className="pl-2 font-light">Cặp câu song ngữ</span>
                                </Link>
                            </div>
                            <div className="space-y-2">
                                <Link to="/admin/adminDashboard" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <ChartNoAxesColumn className="h-5 w-5" />
                                    <span className="pl-2 font-light">Admin Page</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 4 */}
                            <div className="space-y-2">
                                <Link to="/logout" className="mt-6 flex items-center space-x-2 hover:text-cyan-500">
                                    <Power className="h-5 w-5" />
                                    <span className="pl-2 font-light">Đăng xuất</span>
                                </Link>
                            </div>
                        </nav>
                    )}

                    {activeTab === 'Thông báo' && (
                        <div className="space-y-2">
                            <p>Chưa có thông báo mới</p>
                            {/* Danh sách thông báo cho zô đây */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
