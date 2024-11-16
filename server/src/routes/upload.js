import { Router } from "express";
import { uploadImage, uploadSubtitleHandler } from "../controllers/upload.js"; // Thêm `.js` vào cuối đường dẫn
import upload from "../config/cloudinaryConfig.js"; // Thêm `.js` vào cuối đường dẫn
import uploadSubtitle from "../config/cloudinarySubtitleConfig.js";

const routerUpload = Router();

routerUpload.post("/upload-image", upload.single("thumbnail"), uploadImage); // Sử dụng upload middleware
routerUpload.post("/upload-subtitle", uploadSubtitle.single("subtitle"), uploadSubtitleHandler);

export default routerUpload; // Sử dụng `export default`
