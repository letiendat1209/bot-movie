import { useState } from 'react';

import toji from '~/assets/images/toji.png';
function UserProfile() {
    const [activeTab, setActiveTab] = useState('Posts'); // Quản lý tab đang mở

    return (
        <div className="">
            {/* Banner */}
            <div className="relative">
                <img className="w-full h-[50vh] object-cover" src={toji} alt="Cover" />

                {/* Avatar */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                    <img
                        className="w-36 h-36 rounded-full border-4 border-white"
                        src="https://avatarfiles.alphacoders.com/375/375863.jpeg"
                        alt="Avatar"
                    />
                </div>
            </div>

            {/* User Info */}
            <div className="mt-16 text-center">
                <h1 className="text-3xl font-semibold">Bột thích Coding</h1>
                <p className="text-gray-600">Người này lười, không để lại sở thích gì</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center mt-6 space-x-4 border-b border-gray-300">
                <button
                    className={`text-lg pb-2 ${activeTab === 'Posts' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Posts')}
                >
                    Bài viết
                </button>
                <button
                    className={`text-lg pb-2 ${activeTab === 'Friends' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Friends')}
                >
                    Bạn bè
                </button>
                <button
                    className={`text-lg pb-2 ${activeTab === 'Photos' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Photos')}
                >
                    Ảnh
                </button>
                <button
                    className={`text-lg pb-2 ${activeTab === 'About' ? 'text-blue-500 border-blue-500 border-b-2' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('About')}
                >
                    Giới thiệu
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'Posts' && <div className="text-center">Danh sách bài viết...</div>}
                {activeTab === 'Friends' && <div className="text-center">Danh sách bạn bè...</div>}
                {activeTab === 'Photos' && <div className="text-center">Album ảnh...</div>}
                {activeTab === 'About' && <div className="text-center">Thông tin giới thiệu...</div>}
            </div>
        </div>
    );
}

export default UserProfile;
