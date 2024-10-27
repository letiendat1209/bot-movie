/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, Eye, Calendar, Star, Clock } from 'lucide-react';

const Movies = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    // Mock data for movies
    const movies = [
        {
            id: 'MV001',
            title: 'Inception',
            thumbnail:
                'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1OiiMz4VfZ9JQuMn0FXiHzncAWiDrtonc%3Dw500-h750&w=320&q=80',
            genre: 'Khoa học viễn tưởng',
            duration: '2h 28m',
            releaseYear: '2020',
            rating: 4.8,
            status: 'public',
            views: '125,432',
            quality: '4K',
        },
        {
            id: 'MV002',
            title: 'The Dark Knight',
            thumbnail:
                'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1zzn_ZUIIg1nJvo-6bJIzjfI_5alCDXzF%3Dw500-h750&w=320&q=80',
            genre: 'Hành động',
            duration: '2h 32m',
            releaseYear: '2019',
            rating: 4.9,
            status: 'public',
            views: '98,654',
            quality: 'HD',
        },
        {
            id: 'MV003',
            title: 'Parasite',
            thumbnail:
                'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1yglwAIqXFWw4iGv177w8PhARGlOcWZM0%3Dw500-h750&w=320&q=80',
            genre: 'Chính kịch',
            duration: '2h 12m',
            releaseYear: '2021',
            rating: 4.7,
            status: 'private',
            views: '85,321',
            quality: 'FHD',
        },
        {
            id: 'MV004',
            title: 'Avengers: Endgame',
            thumbnail:
                'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1yglwAIqXFWw4iGv177w8PhARGlOcWZM0%3Dw500-h750&w=320&q=80',
            genre: 'Hành động',
            duration: '3h 1m',
            releaseYear: '2022',
            rating: 4.6,
            status: 'public',
            views: '150,789',
            quality: '4K',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý danh sách phim</h1>
                <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <Plus className="mr-2 h-5 w-5" />
                    Thêm phim mới
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4">
                        <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none">
                            <option value="">Tất cả thể loại</option>
                            <option value="action">Hành động</option>
                            <option value="drama">Chính kịch</option>
                            <option value="scifi">Khoa học viễn tưởng</option>
                        </select>

                        <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none">
                            <option value="">Tất cả năm</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>

                        <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none">
                            <option value="">Tất cả trạng thái</option>
                            <option value="public">Công khai</option>
                            <option value="private">Riêng tư</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Movies List */}
            <div className="rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phim</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thể loại</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thời lượng</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Năm</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Đánh giá</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Lượt xem</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Trạng thái</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {movies.map((movie) => (
                                <tr key={movie.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <img src={movie.thumbnail} alt={movie.title} className="h-20 w-14 rounded object-cover" />
                                            <div>
                                                <div className="font-medium text-gray-900">{movie.title}</div>
                                                <div className="text-sm text-gray-500">{movie.id}</div>
                                                <div className="text-sm text-blue-600">{movie.quality}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{movie.genre}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{movie.duration}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{movie.releaseYear}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <Star className="h-4 w-4 text-yellow-400" />
                                            <span className="ml-1 text-sm text-gray-600">{movie.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">{movie.views}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${movie.status === 'public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                        >
                                            {movie.status === 'public' ? 'Công khai' : 'Riêng tư'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center space-x-3">
                                            <button className="p-1 hover:text-blue-600">
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            <button className="p-1 hover:text-green-600">
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button className="p-1 hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t px-6 py-3">
                    <div className="text-sm text-gray-500">Hiển thị 1-10 của 50 phim</div>
                    <div className="flex space-x-2">
                        <button className="rounded border p-2 hover:bg-gray-50">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="rounded border bg-blue-50 px-3 py-1 text-blue-600">1</button>
                        <button className="rounded border px-3 py-1 hover:bg-gray-50">2</button>
                        <button className="rounded border px-3 py-1 hover:bg-gray-50">3</button>
                        <button className="rounded border p-2 hover:bg-gray-50">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movies;
