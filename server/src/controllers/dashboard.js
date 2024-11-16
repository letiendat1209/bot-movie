import models from "../models";

// Lấy tổng tất cả total_views của tất cả movies 
export const getTotalViews = async (req, res) => {
    try {
        const totalViews = await models.Movie.sum('total_views');
        res.status(200).json({ totalViews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy số lượng tất cả người dùng
export const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await models.User.count();
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy tất cả phim mới trong tuần
// Lấy danh sách các movie có upvote nhiều nhất
