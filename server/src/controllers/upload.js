// controllers/upload.js
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Import fs để xóa file tạm thời sau khi upload xong

export const uploadSubtitleHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No subtitle file uploaded" });
    }

    // Lấy phần mở rộng của file từ tên file gốc
    const fileExtension = req.file.originalname.split(".").pop();

    // Upload trực tiếp lên Cloudinary với `resource_type` là `raw`
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "subtitles",
      resource_type: "raw",
      public_id: `${req.file.originalname}`, // Đặt tên file với phần mở rộng
      use_filename: true,
      unique_filename: false,
    });

    // Xóa file tạm thời sau khi upload xong
    fs.unlinkSync(req.file.path);

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Subtitle upload error:", error);
    res.status(500).json({ error: error.message });
  }
};
