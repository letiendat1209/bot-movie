import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '~/services/movies';

function MovieList({ title }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getAllMovies();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);
    return (
        <>
            <h2 className="mb-4 text-3xl font-bold uppercase text-cyan-200">{title}</h2>
            <h3 className="mb-4 text-white">Find the best new and continuing simulcasts here!</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {movies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                        <div className="group relative h-full w-full overflow-hidden">
                            <div className="relative h-full w-full cursor-pointer">
                                {/* Ảnh */}
                                <img
                                    className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={movie.thumbnail}
                                    alt={movie.title}
                                />

                                {/* Lớp phủ tối */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                {/* Rating */}
                                <div className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                                    ★ {movie.rating}
                                </div>

                                {/* Tiêu đề và nội dung */}
                                <div className="absolute bottom-4 mx-2 flex flex-col items-start space-y-2">
                                    <p className="line-clamp-2 text-sm font-bold uppercase text-white text-shadow hover:text-cyan-200">
                                        {movie.title}
                                    </p>
                                    {movie.seasons.length > 0 ? (
                                        <p className="text-sm text-white text-shadow hover:text-yellow-300">
                                            Season {movie.seasons[0].season_number} | Episode{' '}
                                            {movie.seasons[0].episodes[0]?.episode_number || '1'}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-white text-shadow hover:text-yellow-300">Season 1 | Episode 1</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

MovieList.propTypes = {
    title: PropTypes.string,
};

export default MovieList;
