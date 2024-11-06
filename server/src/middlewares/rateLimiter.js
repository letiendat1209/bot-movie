import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn 100 request mỗi 15 phút cho mỗi IP
  message: "Too many requests from this IP, please try again later.",
});
