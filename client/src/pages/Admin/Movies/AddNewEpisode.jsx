import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEpisode } from '~/services/episodes';

const AddNewEpisode = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [episodeData, setEpisodeData] = useState({
        episode_number: '',
        season_id: id,
        title: '',
        air_date: '',
        duration: '',
        video_url: '',
        overview: '',
        still_path: '',
        subtitle_url: '',
        thumbnail: '',
    });

    const handleEpisodeChange = (e) => {
        const { name, value } = e.target;
        setEpisodeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await createEpisode(episodeData);
            console.log('Episode created successfully:', response);

            // Hiển thị thông báo thành công (có thể sử dụng toast notification)
            alert('Tập phim đã được tạo thành công!');

            // Redirect về trang danh sách episodes của season
            navigate(`/admin/episodeDetail/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo tập phim');
            console.error('Error creating episode:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto p-4">
            <h1 className="mb-6 text-2xl font-bold">Thêm tập mới</h1>

            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Thông tin tập phim</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Số tập</label>
                            <input
                                type="number"
                                name="episode_number"
                                value={episodeData.episode_number}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Season ID</label>
                            <input
                                type="number"
                                name="season_id"
                                value={episodeData.season_id}
                                readOnly
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={episodeData.title}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Ngày phát hành</label>
                            <input
                                type="date"
                                name="air_date"
                                value={episodeData.air_date}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Thời lượng (phút)</label>
                            <input
                                type="number"
                                name="duration"
                                value={episodeData.duration}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Video URL (Youtube,Vimeo...)</label>
                            <input
                                type="url"
                                name="video_url"
                                value={episodeData.video_url}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium">Tóm tắt nội dung</label>
                            <textarea
                                name="overview"
                                value={episodeData.overview}
                                onChange={handleEpisodeChange}
                                rows="3"
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Subtitle Default URL</label>
                            <input
                                type="text"
                                name="subtitle_url"
                                value={episodeData.subtitle_url}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Still Path</label>
                            <input
                                type="text"
                                name="still_path"
                                value={episodeData.still_path}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Thumbnail URL</label>
                            <input
                                type="url"
                                name="thumbnail"
                                value={episodeData.thumbnail}
                                onChange={handleEpisodeChange}
                                className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="rounded border px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => navigate(`/seasons/${id}/episodes`)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang lưu...' : 'Lưu tập phim'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewEpisode;
