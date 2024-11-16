/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '~/services/user';

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUserById(id);
            setUser(response);
            setEditedUser(response);
        };
        fetchUsers();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await updateUserById(id, editedUser);
            setUser(response);
            setIsEditing(false);
            setStatusMessage('Cập nhật thành công!');
        } catch (error) {
            setStatusMessage('Cập nhật thất bại, vui lòng thử lại!');
        }
    };

    const renderInput = (label, name, value, editable = true, type = 'text') => (
        <li className="flex justify-between py-4">
            <label className="font-medium text-gray-600">{label}</label>
            {isEditing && editable ? (
                <input
                    type={type}
                    name={name}
                    value={editedUser[name] || ''}
                    onChange={handleInputChange}
                    className="rounded-lg border border-gray-300 p-2"
                />
            ) : (
                <span className="text-gray-800">{value}</span>
            )}
        </li>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Chi tiết người dùng</h1>
            </div>

            {/* User Profile Section */}
            <div className="relative mb-8 rounded-lg bg-white shadow-sm">
                <div
                    className="h-40 rounded-t-lg bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${user.background_url})`,
                        objectFit: 'cover',
                    }}
                ></div>
                <div className="relative -mt-12 flex items-center px-6">
                    <img src={user.avatar_url} alt={user.username} className="object-cover h-24 w-24 rounded-full border-4 border-white shadow-md" />
                    <div className="ml-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>
                </div>
            </div>

            {/* User Details */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-800">Thông tin cá nhân</h3>
                <ul className="divide-y divide-gray-200">
                    {renderInput('Email', 'email', user.email, true, 'email')}
                    {renderInput('Tên đăng nhập', 'username', user.username, false)}
                    {renderInput('Vai trò', 'role', user.role, true)}
                    {renderInput('Trạng thái', 'status', user.status, true)}
                    {renderInput('Ngày tạo', 'created_at', new Date(user.created_at).toLocaleDateString('vi-VN'), false)}
                    {renderInput(
                        'Lần đăng nhập cuối',
                        'last_login_at',
                        user.last_login_at ? new Date(user.last_login_at).toLocaleDateString('vi-VN') : 'Chưa đăng nhập',
                        false,
                    )}
                    {renderInput('Reset Token', 'reset_token', user.reset_token, false)}
                    {renderInput('Hết hạn Token', 'reset_token_expiry', new Date(user.reset_token_expiry).toLocaleString('vi-VN'), false)}
                </ul>
                <div className="mt-4">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <div className="flex space-x-4">
                            <button onClick={handleSaveChanges} className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                                Lưu
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedUser(user);
                                }}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Status Message */}
            {statusMessage && <div className="mt-4 rounded-lg bg-gray-100 p-4 text-gray-700 shadow-sm">{statusMessage}</div>}
        </div>
    );
};

export default UserDetail;
