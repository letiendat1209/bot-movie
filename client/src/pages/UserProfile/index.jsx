/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Camera, Focus } from 'lucide-react';
import toji from '~/assets/images/toji.png';

function UserProfile() {
    const [activeTab, setActiveTab] = useState('Posts');
    const [coverImage, setCoverImage] = useState(toji);
    const [avatarImage, setAvatarImage] = useState('https://avatarfiles.alphacoders.com/375/375863.jpeg');
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);

    const handleCoverChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarImage(URL.createObjectURL(file));
        }
    };

    return (
        <>
            {/* Banner */}
            <div className="relative">
                <img className="h-[50vh] w-full object-cover" src={coverImage} alt="Cover" />

                {/* Nút upload ảnh nền */}
                <div className="absolute bottom-3 left-3 h-8 w-8 overflow-hidden rounded bg-black/50 text-[14px] font-extralight text-white transition-all duration-300 hover:w-[115px]">
                    <div className="flex h-full w-[130px] items-center gap-1 px-1">
                        <Camera className="h-6 w-6" />
                        <span> Đổi hình nền</span>
                        <input
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            type="file"
                            id="change-cover"
                            name="change-cover"
                            accept="image/png, image/jpeg"
                            onChange={handleCoverChange}
                        />
                    </div>
                </div>

                {/* Avatar */}
                <div
                    className="absolute -bottom-16 left-1/2 h-36 w-36 -translate-x-1/2 transform"
                    onMouseEnter={() => setIsAvatarHovered(true)}
                    onMouseLeave={() => setIsAvatarHovered(false)}
                >
                    {/* Avatar Image and Border */}
                    <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white">
                        <img className="h-full w-full object-cover" src={avatarImage} alt="Avatar" />

                        {isAvatarHovered && (
                            <div className="absolute bottom-0 left-0 flex h-[45%] w-full flex-col items-center justify-center rounded-b-full bg-black bg-opacity-50 opacity-100 transition-opacity duration-300 ease-in-out">
                                <label className="flex cursor-pointer flex-col items-center gap-1 text-white">
                                    <Focus size={18} />
                                    <span className="text-sm">Đổi avatar</span>
                                    <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/png, image/jpeg" />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-20 text-center">
                <h1 className="text-3xl font-semibold">Dat thích Code</h1>
                <p className="text-gray-600">Người này lười, không để lại sở thích gì</p>
            </div>
            {/* Navigation Tabs */}
            <div className="mt-6 flex justify-center space-x-4 border-b border-gray-300">
                <button
                    className={`pb-2 text-lg ${activeTab === 'Posts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Posts')}
                >
                    Bài viết
                </button>
                <button
                    className={`pb-2 text-lg ${activeTab === 'Friends' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Friends')}
                >
                    Bạn bè
                </button>
                <button
                    className={`pb-2 text-lg ${activeTab === 'Photos' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('Photos')}
                >
                    Ảnh
                </button>
                <button
                    className={`pb-2 text-lg ${activeTab === 'About' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
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
        </>
    );
}

export default UserProfile;
