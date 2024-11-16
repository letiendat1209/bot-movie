/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllMovies } from '~/services/movies';
import FilterSortPanel from '~/components/FilterSortPanel';

const MovieFilter = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { type } = useParams();

    // Memoize fetchMovies to prevent unnecessary recreations
    const fetchMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getAllMovies();
            const filteredMovies = response.filter(movie => movie.type === type);
            setMovies(filteredMovies);
        } catch (error) {
            setError('Failed to fetch movies. Please try again later.');
            console.error('Failed to fetch movies:', error);
        } finally {
            setIsLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // Memoize movie cards rendering
    const renderMovieCards = useMemo(() => (
        movies.map((movie) => (
            <Link 
                to={`/movies/${movie.id}`} 
                key={movie.id}
                className="block transform transition-transform duration-300 hover:scale-105"
            >
                <div className="min-h-[315px] group relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                    <img
                        className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                        src={movie.thumbnail}
                        alt={movie.title}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                        <h3 className="line-clamp-2 text-lg font-semibold hover:text-cyan-200">
                            {movie.title}
                        </h3>
                        {movie.seasons?.length > 0 ? (
                            <p className="text-sm text-white text-shadow hover:text-yellow-300">
                                Season {movie.seasons[0].season_number} | Episode{' '}
                                {movie.seasons[0].episodes[0]?.episode_number || '1'}
                            </p>
                        ) : (
                            <p className="text-sm text-white text-shadow hover:text-yellow-300">
                                Season 1 | Episode 1
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        ))
    ), [movies]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="mx-4 mb-10 px-4 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-8">
                {/* Left Side: Movie List */}
                <div>
                    <h1 className="mb-6 text-3xl font-bold capitalize text-cyan-200">{type}</h1>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {renderMovieCards}
                    </div>
                </div>

                {/* Right Side: Filter and Sort */}
                <div className="hidden lg:block">
                    <FilterSortPanel />
                </div>
            </div>

            {/* Mobile Filter Panel */}
            <div className="mt-8 block lg:hidden">
                <FilterSortPanel />
            </div>
        </div>
    );
};

export default MovieFilter;