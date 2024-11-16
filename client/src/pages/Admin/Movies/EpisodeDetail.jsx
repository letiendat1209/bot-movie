import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEpisodeById, updateEpisode } from '~/services/episodes';
import { getSubtitleByEpisodeId, updateSubtitle, createSubtitle } from '~/services/subtitle';

const EpisodeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [formData, setFormData] = useState({
        season_id: '',
        episode_number: '',
        title: '',
        air_date: '',
        duration: '',
        video_url: '',
        overview: '',
        eng_sub_url: '',
        vie_sub_url: ''
    });

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const episodeData = await getEpisodeById(id);
                setEpisode(episodeData.data);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    season_id: episodeData.data.season_id,
                    episode_number: episodeData.data.episode_number,
                    title: episodeData.data.title,
                    air_date: episodeData.data.air_date,
                    duration: episodeData.data.duration,
                    video_url: episodeData.data.video_url,
                    overview: episodeData.data.overview
                }));
            } catch (error) {
                console.error('Failed to fetch episode:', error);
            }
        };

        const fetchSubtitle = async () => {
            try {
                const subtitleData = await getSubtitleByEpisodeId(id);
                if (subtitleData.data.length > 0) {
                    setSubtitle(subtitleData.data[0]);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        eng_sub_url: subtitleData.data[0].eng_sub_url,
                        vie_sub_url: subtitleData.data[0].vie_sub_url
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch subtitle:', error);
            }
        };

        fetchEpisode();
        fetchSubtitle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update Episode
            await updateEpisode(id, {
                season_id: formData.season_id,
                episode_number: formData.episode_number,
                title: formData.title,
                air_date: formData.air_date,
                duration: formData.duration,
                video_url: formData.video_url,
                overview: formData.overview
            });

            // Update or Create Subtitle
            if (subtitle) {
                await updateSubtitle(subtitle.id, {
                    eng_sub_url: formData.eng_sub_url,
                    vie_sub_url: formData.vie_sub_url
                });
            } else {
                await createSubtitle({
                    episode_id: id,
                    eng_sub_url: formData.eng_sub_url,
                    vie_sub_url: formData.vie_sub_url
                });
            }
            navigate('/admin/movies');
            alert('Episode and subtitle updated successfully!');
        } catch (error) {
            console.error('Failed to update episode or subtitle:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (!episode) return <p>Loading episode data...</p>;

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-4 text-2xl font-bold">Edit Episode</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Season ID */}
                <div>
                    <label htmlFor="season_id" className="mb-2 block font-medium text-gray-700">
                        Season ID
                    </label>
                    <input
                        id="season_id"
                        name="season_id"
                        type="number"
                        value={formData.season_id}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Episode Number */}
                <div>
                    <label htmlFor="episode_number" className="mb-2 block font-medium text-gray-700">
                        Episode Number
                    </label>
                    <input
                        id="episode_number"
                        name="episode_number"
                        type="number"
                        value={formData.episode_number}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Title */}
                <div>
                    <label htmlFor="title" className="mb-2 block font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Air Date */}
                <div>
                    <label htmlFor="air_date" className="mb-2 block font-medium text-gray-700">
                        Air Date
                    </label>
                    <input
                        id="air_date"
                        name="air_date"
                        type="date"
                        value={formData.air_date}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label htmlFor="duration" className="mb-2 block font-medium text-gray-700">
                        Duration (minutes)
                    </label>
                    <input
                        id="duration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Video URL */}
                <div>
                    <label htmlFor="video_url" className="mb-2 block font-medium text-gray-700">
                        Video URL
                    </label>
                    <input
                        id="video_url"
                        name="video_url"
                        type="url"
                        value={formData.video_url}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Overview */}
                <div>
                    <label htmlFor="overview" className="mb-2 block font-medium text-gray-700">
                        Overview
                    </label>
                    <textarea
                        id="overview"
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* English Subtitle URL */}
                <div>
                    <label htmlFor="eng_sub_url" className="mb-2 block font-medium text-gray-700">
                        English Subtitle URL
                    </label>
                    <input
                        id="eng_sub_url"
                        name="eng_sub_url"
                        type="url"
                        value={formData.eng_sub_url}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Vietnamese Subtitle URL */}
                <div>
                    <label htmlFor="vie_sub_url" className="mb-2 block font-medium text-gray-700">
                        Vietnamese Subtitle URL
                    </label>
                    <input
                        id="vie_sub_url"
                        name="vie_sub_url"
                        type="url"
                        value={formData.vie_sub_url}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EpisodeDetail;
