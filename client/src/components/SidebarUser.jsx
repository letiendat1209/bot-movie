/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRound, UserRoundPen, Lock, Film, Heart, Eye, Power, BookA, Bell } from 'lucide-react'; // Import các icon cần dùng

function Sidebar({ isOpen, toggleSidebar }) {
    const [activeTab, setActiveTab] = useState('Thông tin'); // Quản lý tab đang mở

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 h-screen bg-black bg-opacity-50 z-40 transition-opacity ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={toggleSidebar} // Khi ấn vào overlay sẽ đóng sidebar
            ></div>

            <div
                className={`fixed top-0 right-0 w-[300px] h-screen bg-[#1c1c1e] bg-opacity-50 backdrop-blur-sm text-white shadow-lg z-50 transition-transform transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-4 pt-2">
                    <div className="flex justify-between items-center">
                        <button onClick={toggleSidebar} className="text-white text-2xl hover:text-gray-400 focus:outline-none">
                            &times;
                        </button>
                        <img
                            src="https://avatarfiles.alphacoders.com/375/375863.jpeg"
                            alt="Avatar"
                            className="h-10 w-10 mr-6 rounded-full"
                        />
                    </div>
                    <h2 className="text-md font-semibold my-4">Chào datvipprono1!</h2>

                    {/* Tabs */}
                    <div className="flex space-x-4">
                        <span
                            className={`text-sm p-2 border-b-2 cursor-pointer ${
                                activeTab === 'Thông tin' ? 'text-cyan-500 border-cyan-500' : 'text-white border-transparent'
                            } hover:text-cyan-500`}
                            onClick={() => setActiveTab('Thông tin')}
                        >
                            Thông tin
                        </span>
                        <span
                            className={`text-sm p-2 border-b-2 cursor-pointer ${
                                activeTab === 'Thông báo' ? 'text-cyan-500 border-cyan-500' : 'text-white border-transparent'
                            } hover:text-cyan-500`}
                            onClick={() => setActiveTab('Thông báo')}
                        >
                            Thông báo
                        </span>
                    </div>
                    <hr className="border-gray-500 mb-4" />

                    {activeTab === 'Thông tin' && (
                        <nav className="space-y-4">
                            {/* Phần 1 */}
                            <div className="space-y-2">
                                <Link to="/profile" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <UserRound className="h-5 w-5" />
                                    <span className="font-light pl-2">Trang cá nhân</span>
                                </Link>
                                <Link to="/edit-info" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <UserRoundPen className="h-5 w-5" />
                                    <span className="font-light pl-2">Sửa thông tin</span>
                                </Link>
                                <Link to="/change-password" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Lock className="h-5 w-5" />
                                    <span className="font-light pl-2">Đổi mật khẩu</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 2 */}
                            <div className="space-y-2">
                                <Link to="/watched-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Film className="h-5 w-5" />
                                    <span className="font-light pl-2">Phim đã xem</span>
                                </Link>
                                <Link to="/liked-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Heart className="h-5 w-5" />
                                    <span className="font-light pl-2">Phim đã thích</span>
                                </Link>
                                <Link to="/following-movies" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <Eye className="h-5 w-5" />
                                    <span className="font-light pl-2">Phim đang theo dõi</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 3 */}
                            <div className="space-y-2">
                                <Link to="/#" className="flex items-center space-x-2 hover:text-cyan-500">
                                    <BookA className="h-5 w-5" />
                                    <span className="font-light pl-2">Cặp câu song ngữ</span>
                                </Link>
                            </div>

                            <hr className="border-gray-500" />

                            {/* Phần 4 */}
                            <div className="space-y-2">
                                <Link to="/logout" className="flex mt-6 items-center space-x-2 hover:text-cyan-500">
                                    <Power className="h-5 w-5" />
                                    <span className="font-light pl-2">Đăng xuất</span>
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
