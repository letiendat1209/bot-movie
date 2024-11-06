import express from "express";
import cors from "cors";
import connectDatabase from "./src/config/connectDatabase";
import initRoutes from "./src/routes";
import dotenv from "dotenv";
import session from "express-session";
import { errorHandler } from "./src/middlewares/errorHandler";
dotenv.config();

const { PORT, SESSION_KEY, CLIENT_URL } = process.env;

require("dotenv").config();
// Thiết lập server
const app = express();
// Thiết lập CORS với các cấu hình cụ thể.
// - Origin : chỉ cho phép các yêu cầu từ 'CLIENT_URL' trong file .env
// - method : chỉ cho phép các phương thức 'GET', 'POST', 'PUT', 'DELETE'
app.use(
  cors(
    {
      origin: CLIENT_URL,
      methods: ["GET", "PUT", "POST", "DELETE"],
    },
    session({
      secret: SESSION_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Chuyển sang true nếu sử dụng HTTPS
    })
  )
);
//middleware để parse các yêu cầu có payload JSON.
app.use(express.json());
// middleware để parse các yêu cầu có payload URL-endCoded.
app.use(express.urlencoded({ extended: true }));
// Hàm khởi tạo các route cho ứng dụng
app.use("/api", initRoutes);
// Middleware xử lý lỗi
app.use(errorHandler);
// Gọi hàm để kết nối đến cơ sở dữ liệu
connectDatabase();
// Lấy giá trị port từ .env hoặc sử dụng cổng mặc định là 6666
const port = PORT || 6666;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
