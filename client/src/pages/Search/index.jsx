/* eslint-disable no-unused-vars */
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '~/components/MovieList';
import { getAllMovies } from '~/services/movies';



function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getAllMovies();
                const data = await response;  
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);
    console.log(movies);
    const handleSearch = () => {
        const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
        setResults(filteredMovies);
        setHasSearched(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <>
            <div className="mb-10 flex flex-col items-center px-4 pt-20">
                <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-cyan-400">Tìm kiếm phim</h1>
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="w-full rounded-full border-2 border-gray-300 bg-white p-4 pl-12 text-lg text-gray-900 shadow-lg transition duration-300 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-800 dark:text-gray-100"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400" />
                </div>

                <button
                    onClick={handleSearch}
                    className="mb-6 mt-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-900 px-8 py-3 font-semibold text-white shadow-md transition-all duration-700 ease-in-out hover:bg-gradient-to-r hover:from-indigo-900 hover:to-blue-500 hover:shadow-lg"
                >
                    Search
                </button>

                {hasSearched && (
                    <div className="mb-6 mr-auto text-3xl font-bold text-gray-800 dark:text-cyan-400">
                        {results.length > 0
                            ? `Kết quả cho từ khóa "${query}"`
                            : `Không tìm thấy kết quả cho từ khóa "${query}"`}
                    </div>
                )}

                {results.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {results.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <div className="group relative h-full w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                                    <img
                                        className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                                        src={movie.thumbnail}
                                        alt={movie.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                                        <h3 className="line-clamp-2 text-lg font-semibold hover:text-cyan-200">{movie.title}</h3>
                                        <p className="text-sm">
                                            Season {movie.season} | Episode {movie.episode}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    hasSearched && <p className="text-lg text-gray-600 dark:text-gray-400">Thử tìm kiếm với từ khóa khác.</p>
                )}
            </div>
            {/* <div className="px-4">
                <MovieList title={'Hoặc phim đang hot'} />
            </div> */}
        </>
    );
}

export default Search;
