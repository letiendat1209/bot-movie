import Genre from "../models/Genre";

// Tạo nhiều genres, kiểm tra không trùng tên
export const createGenres = async (req, res) => {
    try {
        const { genres } = req.body;

        // Kiểm tra nếu genres là một mảng và không rỗng
        if (!Array.isArray(genres) || genres.length === 0) {
            return res.status(400).json({ message: 'Genres must be a non-empty array' });
        }

        // Lấy tất cả tên genre hiện có trong cơ sở dữ liệu
        const existingGenres = await Genre.findAll({ attributes: ['name'] });
        const existingGenreNames = existingGenres.map(genre => genre.name);

        // Lọc các genres không trùng tên
        const newGenres = genres.filter(genre => !existingGenreNames.includes(genre.name));

        // Nếu không có genre nào mới để thêm, trả về thông báo
        if (newGenres.length === 0) {
            return res.status(400).json({ message: 'All genres already exist' });
        }

        // Tạo các genre mới không trùng
        const createdGenres = await Genre.bulkCreate(newGenres);

        res.status(201).json({ message: 'Genres created successfully', data: createdGenres });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Lấy danh sách tất cả genres
export const getAllGenres = async (req, res) => {
    try {
        const data = await Genre.findAll(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy genre theo ID
export const getGenreById = async (req, res) => {
    try {
        const data = await Genre.findByPk(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Cấp nhật genre
export const updateGenres = async (req, res) => {
    try {
        const { genres } = req.body; // genres là mảng chứa các genre cần cập nhật
        // Kiểm tra nếu genres là một mảng và không rỗng
        if (!Array.isArray(genres) || genres.length === 0) {
            return res.status(400).json({ message: 'Genres must be a non-empty array' });
        }
        // Duyệt qua từng genre trong mảng và cập nhật theo id
        const updatePromises = genres.map(async (genre) => {
            const { id, name } = genre;
            
            // Kiểm tra nếu id hoặc name không có trong mỗi đối tượng genre
            if (!id || !name) {
                throw new Error('Each genre must have an id and a name');
            }
            
            // Cập nhật genre dựa trên id
            return await Genre.update({ name }, { where: { id } });
        });
        // Thực thi tất cả các promise cập nhật
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Genres updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Xóa nhiều genres 1 lúc
export const deleteGenres = async (req, res) => {
    try {
        const { genreIds } = req.body; // genreIds là mảng chứa id của các genre cần xóa
        // Kiểm tra nếu genreIds là một mảng và không rỗng
        if (!Array.isArray(genreIds) || genreIds.length === 0) {
            return res.status(400).json({ message: 'genreIds must be a non-empty array' });
        }
        // Xóa các genre có id trong genreIds
        const deletedCount = await Genre.destroy({
            where: {
                id: genreIds
            }
        });
        // Kiểm tra xem có genre nào đã được xóa hay chưa
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No genres found to delete' });
        }
        res.status(200).json({ message: `${deletedCount} genres deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};