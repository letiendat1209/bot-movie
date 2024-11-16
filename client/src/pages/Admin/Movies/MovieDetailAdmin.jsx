/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Clock, Star, Play, Eye, ThumbsUp, Tag, Film, Edit2, Save, X, Plus, Trash } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById, updateMovie } from '~/services/movies';
import { createSeason, deleteSeason } from '~/services/season';

const MovieDetailAdmin = () => {
    const { idMovie } = useParams();
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editedMovie, setEditedMovie] = useState();
    const [newGenre, setNewGenre] = useState('');
    const [newTag, setNewTag] = useState('');
    const [isAddingGenre, setIsAddingGenre] = useState(false);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isAddingSeason, setIsAddingSeason] = useState(false);
    const [newSeason, setNewSeason] = useState({
        title: '',
        air_date: null,
        poster_path: '',
    });
    const handleAddSeason = async () => {
        try {
            const nextSeasonNumber = Math.max(0, ...editedMovie.seasons.map((s) => s.season_number)) + 1;

            // Prepare the API payload
            const seasonData = {
                movie_id: editedMovie.id,
                season_number: nextSeasonNumber || 1,
                title: newSeason.title || `Season ${nextSeasonNumber}`,
                air_date: newSeason.air_date,
                poster_path: newSeason.poster_path,
            };

            // Make API call to create season
            const createdSeason = await createSeason(seasonData);

            // Update local state
            const updatedSeasons = [
                ...editedMovie.seasons,
                {
                    ...createdSeason,
                    episodes: [], // Add empty episodes array for new season
                },
            ];

            setEditedMovie({
                ...editedMovie,
                seasons: updatedSeasons,
            });

            // Reset form
            setNewSeason({
                title: '',
                air_date: null,
                poster_path: '',
            });
            setIsAddingSeason(false);

            // Select the newly created season
            setSelectedSeason(nextSeasonNumber);
        } catch (error) {
            console.error('Error creating season:', error);
            alert('Failed to create season. Please try again.');
        }
    };
    // Add handleDeleteSeason function
    const handleDeleteSeason = async (seasonId) => {
        try {
            // Ask for confirmation before deleting
            if (!confirm('Are you sure you want to delete this season? This action cannot be undone.')) {
                return;
            }

            setIsLoading(true);
            const seasonToDelete = editedMovie.seasons.find((s) => s.id === seasonId);

            // Call the API to delete the season
            await deleteSeason(seasonId);

            // Update local state after successful API call
            const updatedSeasons = editedMovie.seasons.filter((s) => s.id !== seasonId);
            setEditedMovie({
                ...editedMovie,
                seasons: updatedSeasons,
            });

            // If the deleted season was selected, select another season
            if (selectedSeason === seasonToDelete.season_number) {
                if (updatedSeasons.length > 0) {
                    setSelectedSeason(updatedSeasons[0].season_number);
                }
            }

            // Show success message
            alert('Season deleted successfully');
        } catch (error) {
            console.error('Error deleting season:', error);
            alert('Failed to delete season. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovieById(idMovie);
                setEditedMovie(data);
            } catch (error) {
                console.error('There was an error fetching the Movies data!', error);
            }
        };

        fetchMovies();
    }, [idMovie]);
    if (!editedMovie) {
        return <div>Loading...</div>;
    }

    const handleSave = async () => {
        try {
            const updatedMovie = {
                ...editedMovie,
                genres: editedMovie.genres.map((genre) => genre.name),
                tags: editedMovie.tags.map((tag) => tag.name),
                actors: editedMovie.actors.map((actor) => actor.name),
                seasons: editedMovie.seasons.map((season) => ({
                    ...season,
                    episodes: season.episodes.map(({ id, ...episode }) => episode), // Remove `id` from episodes
                })),
            };

            await updateMovie(editedMovie.id, updatedMovie);

            // Set the isEditing state to false to exit the editing mode
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleAddEpisode = (seasonId) => {
        const season = editedMovie.seasons.find((s) => s.id === seasonId);
        const newEpisode = {
            id: Math.max(...season.episodes.map((e) => e.id)) + 1,
            episode_number: season.episodes.length + 1,
            title: `Tập ${season.episodes.length + 1}`,
            duration: null,
        };

        const updatedSeasons = editedMovie.seasons.map((s) => {
            if (s.id === seasonId) {
                return {
                    ...s,
                    episodes: [...s.episodes, newEpisode],
                };
            }
            return s;
        });

        setEditedMovie({
            ...editedMovie,
            seasons: updatedSeasons,
        });
    };

    const handleDeleteEpisode = (seasonId, episodeId) => {
        const updatedSeasons = editedMovie.seasons.map((s) => {
            if (s.id === seasonId) {
                return {
                    ...s,
                    episodes: s.episodes.filter((e) => e.id !== episodeId),
                };
            }
            return s;
        });

        setEditedMovie({
            ...editedMovie,
            seasons: updatedSeasons,
        });
    };

    const handleAddGenre = () => {
        if (!newGenre.trim()) return;

        const existingGenre = editedMovie.genres.find((g) => g.name.toLowerCase() === newGenre.toLowerCase().trim());
        if (existingGenre) {
            setNewGenre('');
            setIsAddingGenre(false);
            return;
        }

        const newGenreObj = {
            id: Math.max(...editedMovie.genres.map((g) => g.id)) + 1,
            name: newGenre.trim(),
        };

        setEditedMovie({
            ...editedMovie,
            genres: [...editedMovie.genres, newGenreObj],
        });

        setNewGenre('');
        setIsAddingGenre(false);
    };

    const handleDeleteGenre = (genreId) => {
        setEditedMovie({
            ...editedMovie,
            genres: editedMovie.genres.filter((g) => g.id !== genreId),
        });
    };

    const handleAddTag = () => {
        if (!newTag.trim()) return;

        const existingTag = editedMovie.tags.find((t) => t.name.toLowerCase() === newTag.toLowerCase().trim());
        if (existingTag) {
            setNewTag('');
            setIsAddingTag(false);
            return;
        }

        const newTagObj = {
            id: Math.max(...editedMovie.tags.map((t) => t.id)) + 1,
            name: newTag.trim(),
        };

        setEditedMovie({
            ...editedMovie,
            tags: [...editedMovie.tags, newTagObj],
        });

        setNewTag('');
        setIsAddingTag(false);
    };

    const handleDeleteTag = (tagId) => {
        setEditedMovie({
            ...editedMovie,
            tags: editedMovie.tags.filter((t) => t.id !== tagId),
        });
    };

    const selectedSeasonData = editedMovie.seasons.find((s) => s.season_number === selectedSeason) || editedMovie.seasons[0];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Top Action Bar */}
            <div className="sticky top-0 z-10 bg-gray-800 p-4 shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold">Movie Admin Panel</h1>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 hover:bg-green-700"
                                >
                                    <Save className="h-4 w-4" /> Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                                >
                                    <X className="h-4 w-4" /> Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
                            >
                                <Edit2 className="h-4 w-4" /> Edit Movie
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(17,24,39,1)), url(${editedMovie.poster})`,
                }}
            >
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mx-auto max-w-7xl">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedMovie.title}
                                onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
                                className="mb-2 w-full bg-gray-800 p-2 text-4xl font-bold"
                            />
                        ) : (
                            <h1 className="mb-2 text-4xl font-bold">{editedMovie.title}</h1>
                        )}
                        <div className="mb-4 flex items-center gap-4 text-sm text-gray-300">
                            {isEditing ? (
                                <>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <input
                                            type="number"
                                            value={editedMovie.rating}
                                            onChange={(e) => setEditedMovie({ ...editedMovie, rating: e.target.value })}
                                            className="w-16 bg-gray-800 p-1"
                                        />
                                        /10
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <input
                                            type="number"
                                            value={editedMovie.duration}
                                            onChange={(e) => setEditedMovie({ ...editedMovie, duration: e.target.value })}
                                            className="w-16 bg-gray-800 p-1"
                                        />
                                        min
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span>{editedMovie.rating}/10</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span>{editedMovie.upvote} likes</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        <span>{editedMovie.total_views} views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{editedMovie.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Film className="h-4 w-4" />
                                        <span className="capitalize">{editedMovie.type}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Genres */}
                        <div className="mb-4 flex flex-wrap gap-2">
                            {editedMovie.genres.map((genre) => (
                                <span key={genre.id} className="flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm">
                                    {genre.name}
                                    {isEditing && (
                                        <button onClick={() => handleDeleteGenre(genre.id)} className="ml-2 text-gray-300 hover:text-white">
                                            ×
                                        </button>
                                    )}
                                </span>
                            ))}
                            {isEditing && !isAddingGenre && (
                                <button
                                    onClick={() => setIsAddingGenre(true)}
                                    className="flex items-center rounded-full bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600"
                                >
                                    <Plus className="mr-1 h-4 w-4" /> Add Genre
                                </button>
                            )}
                            {isEditing && isAddingGenre && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newGenre}
                                        onChange={(e) => setNewGenre(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddGenre()}
                                        placeholder="Enter genre name"
                                        className="rounded bg-gray-700 px-3 py-1 text-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleAddGenre}
                                        className="rounded-full bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingGenre(false);
                                            setNewGenre('');
                                        }}
                                        className="rounded-full bg-gray-600 px-3 py-1 text-sm hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Tag className="h-4 w-4" />
                            {editedMovie.tags.map((tag) => (
                                <span key={tag.id} className="flex items-center text-sm text-gray-400">
                                    #{tag.name}
                                    {isEditing && (
                                        <button onClick={() => handleDeleteTag(tag.id)} className="ml-1 text-gray-500 hover:text-white">
                                            ×
                                        </button>
                                    )}
                                </span>
                            ))}
                            {isEditing && !isAddingTag && (
                                <button
                                    onClick={() => setIsAddingTag(true)}
                                    className="flex items-center text-sm text-gray-400 hover:text-white"
                                >
                                    <Plus className="mr-1 h-4 w-4" /> Add Tag
                                </button>
                            )}
                            {isEditing && isAddingTag && (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                        placeholder="Enter tag name"
                                        className="rounded bg-gray-700 px-3 py-1 text-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleAddTag}
                                        className="rounded-full bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAddingTag(false);
                                            setNewTag('');
                                        }}
                                        className="rounded-full bg-gray-600 px-3 py-1 text-sm hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Left Column - Poster */}
                    <div className="md:col-span-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={editedMovie.thumbnail}
                                        onChange={(e) => setEditedMovie({ ...editedMovie, thumbnail: e.target.value })}
                                        className="mt-1 w-full rounded bg-gray-800 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Poster URL</label>
                                    <input
                                        type="text"
                                        value={editedMovie.poster}
                                        onChange={(e) => setEditedMovie({ ...editedMovie, poster: e.target.value })}
                                        className="mt-1 w-full rounded bg-gray-800 p-2"
                                    />
                                </div>
                            </div>
                        ) : (
                            <img src={editedMovie.thumbnail} alt={editedMovie.title} className="w-full rounded-lg shadow-lg" />
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:col-span-2">
                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="mb-4 text-xl font-bold">Overview</h2>
                            {isEditing ? (
                                <textarea
                                    value={editedMovie.description}
                                    onChange={(e) => setEditedMovie({ ...editedMovie, description: e.target.value })}
                                    className="w-full rounded bg-gray-800 p-4"
                                    rows={4}
                                />
                            ) : (
                                <p className="text-gray-300">{editedMovie.description}</p>
                            )}
                        </div>

                        {/* Seasons & Episodes */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold">Episodes</h2>
                                {isEditing && (
                                    <div className="flex gap-2 align-baseline">
                                        {isAddingSeason ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={newSeason.title}
                                                    onChange={(e) => setNewSeason({ ...newSeason, title: e.target.value })}
                                                    placeholder="Season title"
                                                    className="rounded bg-gray-700 px-3 py-1 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    value={newSeason.poster_path || ''}
                                                    onChange={(e) => setNewSeason({ ...newSeason, poster_path: e.target.value })}
                                                    placeholder="Poster URL"
                                                    className="rounded bg-gray-700 px-3 py-1 text-sm"
                                                />
                                                <button
                                                    onClick={handleAddSeason}
                                                    className="flex items-center gap-2 rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => setIsAddingSeason(false)}
                                                    className="flex items-center gap-2 rounded bg-gray-600 px-3 py-1 text-sm hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setIsAddingSeason(true)}
                                                className="flex items-center gap-2 rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                                            >
                                                <Plus className="h-4 w-4" /> Add Season
                                            </button>
                                        )}
                                        {selectedSeasonData?.id ? (
                                            <Link to={`/admin/AddNewEpisode/${selectedSeasonData.id}`} key={selectedSeasonData.id}>
                                                <button
                                                    onClick={() => handleAddEpisode(selectedSeasonData.id)}
                                                    className="flex items-center gap-2 rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                                                >
                                                    <Plus className="h-4 w-4" /> Add Episode
                                                </button>
                                            </Link>
                                        ) : (
                                            <p className="text-sm text-red-500">Please select a season first!</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Season Selector */}
                            <div className="mb-6 flex gap-2">
                                {editedMovie.seasons.map((season) => (
                                    <div key={season.id} className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedSeason(season.season_number)}
                                            className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                                                selectedSeason === season.season_number
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                            }`}
                                        >
                                            Season {season.season_number}
                                        </button>
                                        {isEditing && (
                                            <button
                                                onClick={() => handleDeleteSeason(season.id)}
                                                className="rounded-lg bg-red-600 p-2 hover:bg-red-700"
                                                title="Delete Season"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Episodes List */}
                            <div className="space-y-4">
                                {selectedSeasonData?.episodes.map((episode) => (
                                    <Link
                                        to={`/admin/episodeDetail/${episode.id}`}
                                        key={episode.id}
                                        className="flex items-center justify-between rounded-lg bg-gray-800 p-4 transition-all duration-200 hover:bg-gray-700"
                                    >
                                        {isEditing ? (
                                            <>
                                                <div className="flex flex-1 items-center gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600">
                                                        <Play className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={episode.title}
                                                            onChange={(e) => {
                                                                const updatedSeasons = editedMovie.seasons.map((s) => {
                                                                    if (s.id === selectedSeasonData.id) {
                                                                        return {
                                                                            ...s,
                                                                            episodes: s.episodes.map((ep) => {
                                                                                if (ep.id === episode.id) {
                                                                                    return { ...ep, title: e.target.value };
                                                                                }
                                                                                return ep;
                                                                            }),
                                                                        };
                                                                    }
                                                                    return s;
                                                                });
                                                                setEditedMovie({ ...editedMovie, seasons: updatedSeasons });
                                                            }}
                                                            className="w-full rounded bg-gray-700 p-1 text-sm"
                                                        />
                                                        <div className="flex gap-4">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-sm text-gray-400">Episode</span>
                                                                <input
                                                                    type="number"
                                                                    value={episode.episode_number}
                                                                    onChange={(e) => {
                                                                        const updatedSeasons = editedMovie.seasons.map((s) => {
                                                                            if (s.id === selectedSeasonData.id) {
                                                                                return {
                                                                                    ...s,
                                                                                    episodes: s.episodes.map((ep) => {
                                                                                        if (ep.id === episode.id) {
                                                                                            return {
                                                                                                ...ep,
                                                                                                episode_number: parseInt(e.target.value),
                                                                                            };
                                                                                        }
                                                                                        return ep;
                                                                                    }),
                                                                                };
                                                                            }
                                                                            return s;
                                                                        });
                                                                        setEditedMovie({ ...editedMovie, seasons: updatedSeasons });
                                                                    }}
                                                                    className="w-16 rounded bg-gray-700 p-1 text-sm"
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4 text-gray-400" />
                                                                <input
                                                                    type="number"
                                                                    value={episode.duration || ''}
                                                                    onChange={(e) => {
                                                                        const updatedSeasons = editedMovie.seasons.map((s) => {
                                                                            if (s.id === selectedSeasonData.id) {
                                                                                return {
                                                                                    ...s,
                                                                                    episodes: s.episodes.map((ep) => {
                                                                                        if (ep.id === episode.id) {
                                                                                            return {
                                                                                                ...ep,
                                                                                                duration: e.target.value
                                                                                                    ? parseInt(e.target.value)
                                                                                                    : null,
                                                                                            };
                                                                                        }
                                                                                        return ep;
                                                                                    }),
                                                                                };
                                                                            }
                                                                            return s;
                                                                        });
                                                                        setEditedMovie({ ...editedMovie, seasons: updatedSeasons });
                                                                    }}
                                                                    placeholder="Duration"
                                                                    className="w-16 rounded bg-gray-700 p-1 text-sm"
                                                                />
                                                                <span className="text-sm text-gray-400">min</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleDeleteEpisode(selectedSeasonData.id, episode.id)}
                                                        className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-700"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600">
                                                        <Play className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{episode.title}</h3>
                                                        <p className="text-sm text-gray-400">Episode {episode.episode_number}</p>
                                                    </div>
                                                </div>
                                                {episode.duration && (
                                                    <div className="flex items-center text-sm text-gray-400">
                                                        <Clock className="mr-1 h-4 w-4" />
                                                        {episode.duration} min
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailAdmin;
