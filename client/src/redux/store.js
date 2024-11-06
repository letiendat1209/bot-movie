import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Đảm bảo bạn có file reducers/index.js

const store = configureStore({
    reducer: rootReducer,
});

export default store;
