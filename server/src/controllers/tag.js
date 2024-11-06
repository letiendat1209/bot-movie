import Tag from "../models/Tag";

// Tạo nhiều tag, kiểm tra không trùng tên
export const createTags = async (req, res) => {
    try {
        const { tags } = req.body;

        // Kiểm tra nếu tags là một mảng và không rỗng
        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: 'tags must be a non-empty array' });
        }

        // Lấy tất cả tên tag hiện có trong cơ sở dữ liệu
        const existingTags = await Tag.findAll({ attributes: ['name'] });
        const existingTagNames = existingTags.map(tag => tag.name);

        // Lọc các tags không trùng tên
        const newTags = tags.filter(tag => !existingTagNames.includes(tag.name));

        // Nếu không có tag nào mới để thêm, trả về thông báo
        if (newTags.length === 0) {
            return res.status(400).json({ message: 'All tags already exist' });
        }

        // Tạo các tag mới không trùng
        const createdTags = await Tag.bulkCreate(newTags);

        res.status(201).json({ message: 'tags created successfully', data: createdTags });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy danh sách tất cả các tag
export const getAllTags = async (req, res) => {
    try {
        const data = await Tag.findAll(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Lấy tag theo id
export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Tag.findByPk(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Cập nhật nhiều tag
export const updateTags = async (req, res) => {
    try {
        const { tags } = req.body; // tags là mảng chứa các tag cần cập nhật
        // Kiểm tra nếu tags là một mảng và không rỗng
        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: 'tags must be a non-empty array' });
        }
        // Duyệt qua từng tag trong mảng và cập nhật theo id
        const updatePromises = tags.map(async (tag) => {
            const { id, name } = tag;
            
            // Kiểm tra nếu id hoặc name không có trong mỗi đối tượng tag
            if (!id || !name) {
                throw new Error('Each tag must have an id and a name');
            }
            
            // Cập nhật tag dựa trên id
            return await tag.update({ name }, { where: { id } });
        });
        // Thực thi tất cả các promise cập nhật
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'tags updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Xóa nhiều tag 
export const deleteTags = async (req, res) => {
    try {
        const { tagIds } = req.body; // tagIds là mảng chứa id của các tag cần xóa
        // Kiểm tra nếu tagIds là một mảng và không rỗng
        if (!Array.isArray(tagIds) || tagIds.length === 0) {
            return res.status(400).json({ message: 'tagIds must be a non-empty array' });
        }
        // Xóa các tag có id trong tagIds
        const deletedCount = await Tag.destroy({
            where: {
                id: tagIds
            }
        });
        // Kiểm tra xem có tag nào đã được xóa hay chưa
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No tags found to delete' });
        }
        res.status(200).json({ message: `${deletedCount} tags deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};