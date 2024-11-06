/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, roleRequired, userRole, redirectPath = '/auth', children }) => {
    // Kiểm tra nếu không đăng nhập thì chuyển hướng đến `redirectPath`
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    }

    // Kiểm tra nếu `roleRequired` là mảng và `userRole` không nằm trong mảng đó
    if (roleRequired && Array.isArray(roleRequired) && !roleRequired.includes(userRole)) {
        return <Navigate to="/" />; // Chuyển hướng nếu vai trò không hợp lệ
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
