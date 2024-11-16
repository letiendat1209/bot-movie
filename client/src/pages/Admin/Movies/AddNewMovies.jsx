/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { createMovies } from '~/services/movies';
import { uploadImages } from '~/services/upload';

const AddNewMovies = () => {
    const [movieData, setMovieData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        poster: '',
        trailer_url: '',
        release_date: '',
        duration: '',
        rating: '',
        upvote: 0,
        type: 'movie',
        total_views: 0,
    });

    const [previewImages, setPreviewImages] = useState({
        thumbnail: null,
        poster: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({
                    ...prev,
                    [name]: reader.result,
                }));
                setMovieData((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Upload thumbnail and poster images if they are of File type
            if (movieData.thumbnail instanceof File) {
                const thumbnailData = await uploadImages(movieData.thumbnail);
                movieData.thumbnail = thumbnailData.url; // Update with the URL returned by uploadImages
            }
            if (movieData.poster instanceof File) {
                const posterData = await uploadImages(movieData.poster);
                movieData.poster = posterData.url; // Update with the URL returned by uploadImages
            }
            // Call createMovies API with updated movieData
            const response = await createMovies(movieData);
            console.log(movieData)
            alert('Movie created successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create movie.';
            console.error('Error details:', error); // Log error details for debugging
            alert(`Failed to create movie: ${errorMessage}`);
        }
    };

    return (
        <div className="rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-3xl font-semibold text-gray-800">Thêm phim mới</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="mb-2 block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                        placeholder="Enter movie title"
                        required
                    />
                </div>
                <div>
                    <label className="mb-2 block font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={movieData.description}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                        placeholder="Enter movie description"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Thumbnail Upload */}
                    <div className="flex flex-col items-center">
                        <label className="mb-2 block font-medium text-gray-700">Upload Thumbnail</label>
                        <div className="flex w-full items-center justify-center">
                            <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 transition hover:border-indigo-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    {previewImages.thumbnail ? (
                                        <div className="h-full w-full p-4">
                                            <img
                                                src={previewImages.thumbnail}
                                                alt="Thumbnail Preview"
                                                className="h-full w-full rounded-lg object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="h-10 w-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 5.5a1.5 1.5 0 1 1 3 0v6.3h5.2a1.5 1.5 0 0 1 0 3h-5.2v6.3a1.5 1.5 0 1 1-3 0v-6.3H6.8a1.5 1.5 0 0 1 0-3h5.2V5.5z" />
                                            </svg>
                                            <span className="mt-2 text-sm text-gray-500">Click to upload thumbnail</span>
                                        </div>
                                    )}
                                </div>
                                <input type="file" name="thumbnail" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    {/* Poster Upload */}
                    <div className="flex flex-col items-center">
                        <label className="mb-2 block font-medium text-gray-700">Upload Poster</label>
                        <div className="flex w-full items-center justify-center">
                            <label className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 transition hover:border-indigo-500">
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    {previewImages.poster ? (
                                        <div className="h-full w-full p-4">
                                            <img
                                                src={previewImages.poster}
                                                alt="Poster Preview"
                                                className="h-full w-full rounded-lg object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="h-10 w-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 5.5a1.5 1.5 0 1 1 3 0v6.3h5.2a1.5 1.5 0 0 1 0 3h-5.2v6.3a1.5 1.5 0 1 1-3 0v-6.3H6.8a1.5 1.5 0 0 1 0-3h5.2V5.5z" />
                                            </svg>
                                            <span className="mt-2 text-sm text-gray-500">Click to upload poster</span>
                                        </div>
                                    )}
                                </div>
                                <input type="file" name="poster" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block font-medium text-gray-700">Trailer URL (Youtube)</label>
                    <input
                        type="text"
                        name="trailer_url"
                        value={movieData.trailer_url}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                        placeholder="Enter trailer URL"
                        required
                    />
                </div>
                {/* Release Date */}
                <div>
                    <label className="mb-2 block font-medium text-gray-700">Release Date</label>
                    <input
                        type="date"
                        name="release_date"
                        value={movieData.release_date}
                        onChange={handleChange}
                        className="w-[50%] rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Duration */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">Duration (minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={movieData.duration}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                            placeholder="Duration in minutes"
                            required
                            defaultValue={23}
                        />
                    </div>

                    {/* Total Views */}
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">Total Views</label>
                        <input
                            type="number"
                            name="total_views"
                            value={movieData.total_views}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                            placeholder="Total views"
                            defaultValue={0}
                            readOnly
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">Rating</label>
                        <input
                            type="number"
                            step="0.1"
                            name="rating"
                            value={movieData.rating}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                            placeholder="Rating"
                            required
                            max={10}
                            min={0}
                            defaultValue={0}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">Upvote</label>
                        <input
                            type="number"
                            name="upvote"
                            value={movieData.upvote}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                            defaultValue={0}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="mb-2 block font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={movieData.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="movie">movie</option>
                            <option value="series">anime</option>
                            <option value="series">english 1-1</option>
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-indigo-700 sm:w-auto"
                >
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default AddNewMovies;
