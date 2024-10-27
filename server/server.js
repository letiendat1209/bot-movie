import express from "express";
import cors from "cors";
import connectDatabase from "./src/config/connectDatabase";
import initRoutes from "./src/routes";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const { PORT, DB_URL } = process.env;

require("dotenv").config();
// Thiết lập server
const app = express();
// Thiết lập CORS với các cấu hình cụ thể.
// - Origin : chỉ cho phép các yêu cầu từ 'CLIENT_URL' trong file .env
// - method : chỉ cho phép các phương thức 'GET', 'POST', 'PUT', 'DELETE'
app.use(
  cors(
    {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "PUT", "POST", "DELETE"],
    },
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Chuyển sang true nếu sử dụng HTTPS
    })
  )
);
//middleware để parse các yêu cầu có payload JSON.
app.use(express.json());
// middleware để parse các yêu cầu có payload URL-endcoded.
app.use(express.urlencoded({ extended: true }));
// Hàm khởi tạo các route cho ứng dụng
app.use("/api", initRoutes);
// Gọi hàm để kết nối đến cơ sở dữ liệu
connectDatabase();
// Lấy giá trị port từ .env hoặc sử dụng cổng mặc định là 6666
const port = process.env.PORT || 6666;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
