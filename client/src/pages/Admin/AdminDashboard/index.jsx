/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Film, Users, Play, TrendingUp, Eye, Calendar, AlertCircle, Star, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getTotalUsers, getTotalViews } from '~/services/dashboard'; // Đảm bảo API `getAllMovies` đã được import
import { getAllMovies } from '~/services/movies';

const viewsData = [
    { name: 'T2', views: 4000 },
    { name: 'T3', views: 3000 },
    { name: 'T4', views: 6000 },
    { name: 'T5', views: 8000 },
    { name: 'T6', views: 5000 },
    { name: 'T7', views: 7500 },
    { name: 'CN', views: 9000 },
];

const MovieAdminDashboard = () => {
    const [totalViews, setTotalViews] = useState();
    const [totalUsers, setTotalUsers] = useState();
    const [topMovies, setTopMovies] = useState([]); // State để lưu danh sách phim
    useEffect(() => {
        // Fetch tổng lượt xem
        const fetchTotalViews = async () => {
            try {
                const response = await getTotalViews();
                setTotalViews(response.totalViews);
            } catch (error) {
                console.error('Failed to fetch total views:', error);
            }
        };

        // Fetch tổng số người dùng
        const fetchTotalUsers = async () => {
            try {
                const response = await getTotalUsers();
                setTotalUsers(response.totalUsers);
            } catch (error) {
                console.error('Failed to fetch total users:', error);
            }
        };

        // Fetch danh sách top phim
        const fetchTopMovies = async () => {
            try {
                const response = await getAllMovies(); // Gọi API để lấy danh sách phim
                // lấy số lượng tổng số phim
                const sortedMovies = response
                    .sort((a, b) => b.total_views - a.total_views) // Sắp xếp phim theo lượt xem giảm dần
                    .slice(0, 5); // Lấy 5 phim đầu tiên
                setTopMovies(sortedMovies);
            } catch (error) {
                console.error('Failed to fetch top movies:', error);
            }
        };

        fetchTotalViews();
        fetchTotalUsers();
        fetchTopMovies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Movie Dashboard</h1>
                <p className="mt-1 text-gray-600">Tổng quan về hoạt động của website phim</p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Card Tổng lượt xem */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Tổng lượt xem</p>
                            <h3 className="mt-1 text-2xl font-bold text-gray-800">{totalViews}</h3>
                            <span className="text-sm text-green-500">+15% so với tuần trước</span>
                        </div>
                        <div className="rounded-full bg-blue-100 p-3">
                            <Eye className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Card Người dùng */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Người dùng đăng ký</p>
                            <h3 className="mt-1 text-2xl font-bold text-gray-800">{totalUsers}</h3>
                            <span className="text-sm text-green-500">+8% so với tuần trước</span>
                        </div>
                        <div className="rounded-full bg-green-100 p-3">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Biểu đồ lượt xem */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Lượt xem theo ngày</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={viewsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="views" stroke="#4F46E5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Movies */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Top phim xem nhiều</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-sm text-gray-500">
                                    <th className="px-2 py-3 text-left">ID</th>
                                    <th className="py-3 text-left">Tên phim</th>
                                    <th className="py-3 text-left">Thể loại</th>
                                    <th className="py-3 text-center">Đánh giá</th>
                                    <th className="py-3 text-right">Lượt xem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topMovies.map((movie) => (
                                    <tr key={movie.id} className="border-t border-gray-100">
                                        <td className="px-2 py-3 text-blue-600">{movie.id}</td>
                                        <td className="py-3 font-medium">{movie.title}</td>
                                        <td className="py-3 text-gray-500">{movie.type}</td>
                                        <td className="py-3 text-center">
                                            <span className="flex items-center justify-center">
                                                <Star className="mr-1 inline h-4 w-4 text-yellow-400" />
                                                {movie.rating}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right">{movie.total_views.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-yellow-100 p-3">
                            <Calendar className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Tổng số phim</h3>
                            <p className="mt-1 text-gray-500">
                                {topMovies.length} phim
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Tổng số quản trị</h3>
                            <p className="mt-1 text-gray-500">8 báo cáo cần xử lý</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <Play className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Đang phát trực tiếp</h3>
                            <p className="mt-1 text-gray-500">3 phim đang chiếu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieAdminDashboard;
