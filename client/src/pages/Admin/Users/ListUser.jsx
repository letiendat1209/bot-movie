/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '~/services/user';

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();
            setUsers(response);
        };
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                <Link to="/admin/users/add">
                    <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Thêm người dùng
                    </button>
                </Link>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4">
                        <select
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="all">Tất cả vai trò</option>
                            <option value="user">Người dùng</option>
                            <option value="admin">Quản trị viên</option>
                        </select>

                        <select
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* User List */}
            <div className="rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Avatar</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Username</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Fullname</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Role</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users
                                .filter(
                                    (user) =>
                                        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
                                )
                                .map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <img
                                                src={user.avatar_url}
                                                alt={user.username}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{user.username}</td>
                                        <td className="px-6 py-4 text-gray-700">{user.first_name + ' ' + user.last_name}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-3">
                                                <Link to={`/admin/userDetail/${user.id}`}>
                                                    <button className="p-1 hover:text-blue-600">
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                </Link>
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
                    <div className="text-sm text-gray-500">Hiển thị 1-10 của 50 người dùng</div>
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

export default ListUser;
