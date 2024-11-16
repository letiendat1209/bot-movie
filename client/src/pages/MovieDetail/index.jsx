import { Star, Clock, Share2, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '~/services/movies';

export default function MovieDetail() {
    const { idMovie } = useParams();
    const [movie, setMovie] = useState(null);
    const [activeTab, setActiveTab] = useState('overall'); // Default active tab

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getMovieById(idMovie);
                setMovie(data);
            } catch (error) {
                console.error('There was an error fetching the Movies data!', error);
            }
        };

        fetchMovies();
    }, [idMovie]);
    const firstIdEpisode = movie?.seasons?.[0]?.episodes[0]?.id;
    // Helper function to calculate total seasons and episodes
    const getTotalEpisodes = () => {
        return movie?.seasons?.reduce((total, season) => total + season.episodes.length, 0) || 0;
    };

    return (
        <div className="min-h-screen text-white">
            {/* Hero Image Section */}
            <div className="relative h-[400px]">
                <img src={movie?.thumbnail} alt="Movie cover" className="h-full w-full object-cover opacity-50" />

                {/* Action Buttons */}
                <div className="absolute right-4 top-4 flex gap-2">
                    <button className="rounded-full bg-black/50 p-2">
                        <Star className="h-6 w-6" />
                    </button>
                    <button className="rounded-full bg-black/50 p-2">
                        <Share2 className="h-6 w-6" />
                    </button>
                    <button className="rounded-full bg-black/50 p-2">
                        <MoreVertical className="h-6 w-6" />
                    </button>
                </div>

                {/* Movie Info Container */}
                <div className="absolute -bottom-16 left-[10%] flex gap-8">
                    {/* Movie Poster */}
                    <img src={movie?.thumbnail} alt="Movie poster" className="h-72 w-48 rounded-lg object-cover shadow-lg" />
                    {/* Movie Details */}
                    <div className="mt-auto py-14">
                        <h1 className="mb-2 text-4xl font-bold">{movie?.title}</h1>
                        <div className="my-6 flex gap-2">
                            {movie?.genres?.map((genre) => (
                                <span key={genre.id} className="rounded-full border border-white px-4 py-1 text-sm">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <Link to={`/episode/${firstIdEpisode}`}>
                            <button className="flex items-center rounded-full border border-gray-500 bg-blue-600 px-8 py-2 text-white">
                                <span>WATCH</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-24 px-[10%]">
                {/* Tabs */}
                <div className="mb-6 flex gap-8 border-b border-gray-700">
                    <button
                        className={`pb-2 ${activeTab === 'overall' ? 'border-b-2 border-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('overall')}
                    >
                        Overall
                    </button>
                    <button
                        className={`pb-2 ${activeTab === 'cast' ? 'border-b-2 border-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('cast')}
                    >
                        Cast
                    </button>
                    <button
                        className={`pb-2 ${activeTab === 'reviews' ? 'border-b-2 border-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews
                    </button>
                    <button
                        className={`pb-2 ${activeTab === 'seasons' ? 'border-b-2 border-white' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('seasons')}
                    >
                        Seasons
                    </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overall' && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-[100px_1fr] gap-8">
                            <div className="flex flex-col items-center">
                                <div className="text-4xl font-bold text-blue-500">{movie?.rating}</div>
                                <div className="text-sm text-gray-400">RATING</div>
                            </div>
                            <div className="mr-auto flex flex-col items-center">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    <span className="text-2xl">{movie?.duration || 'N/A'}</span>
                                </div>
                                <div className="mt-auto text-sm text-gray-400">EP LENGTH</div>
                            </div>
                        </div>
                        {/* Story */}
                        <div className="mt-8">
                            <h2 className="mb-4 text-xl font-bold">STORY</h2>
                            <p className="text-gray-300">{movie?.description || 'No description available.'}</p>
                        </div>
                        {/* Details */}
                        <div className="mt-8">
                            <h2 className="mb-4 text-xl font-bold">DETAILS</h2>
                            <div className="space-y-2 text-gray-300">
                                <p>Status: {movie?.is_series ? 'Returning Series' : 'Movie'}</p>
                                <p>Last air date: {movie?.created_at?.split('T')[0]}</p>
                                <p>Spoken language: {movie?.tags.length > 0 ? movie.tags[0].name : 'N/A'}</p>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'seasons' && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-xl font-bold">SEASONS</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Total Seasons: {movie?.seasons.length || 0}</h3>
                            <h3 className="text-lg font-semibold">Total Episodes: {getTotalEpisodes()}</h3>
                        </div>
                        {movie?.seasons?.map((season) => (
                            <div key={season.id} className="mb-4 flex rounded-lg bg-gray-800/50 p-4">
                                {/* Season thumbnail */}
                                <div className="relative mr-4">
                                    <div className="h-24 w-32 overflow-hidden rounded-lg border-2 border-blue-400">
                                        <img src={season.poster_path} alt={season.title} className="h-full w-full object-cover" />
                                    </div>
                                </div>

                                {/* Season details */}
                                <div className="flex-1">
                                    {/* <div className="mb-2 text-sm text-gray-400">
                                        {new Date(season.created_at).toISOString().split('T')[0]}
                                    </div> */}

                                    <div className="mb-1 text-xl font-semibold text-white">Season {season.season_number || 1}</div>

                                    {season.description && <div className="mb-1 text-gray-400">{season.description}</div>}

                                    <div className="text-gray-400">{season.episodes?.length || 0} episodes</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional tabs (like Cast, Reviews) can be implemented similarly */}
            </div>
        </div>
    );
}
