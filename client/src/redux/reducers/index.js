import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer'; // Import các reducer của bạn

const rootReducer = combineReducers({
    auth: authReducer, // Đặt tên theo trạng thái trong store
    // Thêm các reducer khác ở đây
});

export default rootReducer;
