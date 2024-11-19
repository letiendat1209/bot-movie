import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Eye, Star } from 'lucide-react';
import { getAllMovies } from '~/services/movies';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await getAllMovies();
                setMovies(data);
                setFilteredMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    useEffect(() => {
        // Apply all filters
        let result = movies;

        // Search filter
        if (searchTerm) {
            result = result.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Genre filter
        if (selectedGenre) {
            result = result.filter(movie => 
                movie.genres.some(genre => genre.name.toLowerCase() === selectedGenre.toLowerCase())
            );
        }

        // Year filter
        if (selectedYear) {
            result = result.filter(movie => 
                (movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '2024') === selectedYear
            );
        }
        setFilteredMovies(result);
    }, [movies, searchTerm, selectedGenre, selectedYear]);

    // Extract unique genres and years from movies
    const uniqueGenres = [...new Set(
        movies.flatMap(movie => movie.genres.map(genre => genre.name))
    )];

    const uniqueYears = [...new Set(
        movies.map(movie => 
            movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '2024'
        )
    )];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý danh sách phim</h1>
                <Link to="/admin/movies/add">
                    <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        <Plus className="mr-2 h-5 w-5" />
                        Thêm phim mới
                    </button>
                </Link>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>

                    {/* Filters */}
                    <div className="flex space-x-4">
                        <select 
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Tất cả thể loại</option>
                            {uniqueGenres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>

                        <select 
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Tất cả năm</option>
                            {uniqueYears.sort().map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        {/* Uncomment and modify if status filtering is needed */}
                        {/* <select 
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="public">Công khai</option>
                            <option value="private">Riêng tư</option>
                        </select> */}
                    </div>
                </div>
            </div>

            {/* Movies List */}
            <div className="rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phim</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thể loại</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Thời lượng</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Năm</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Đánh giá</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Lượt xem</th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredMovies.map((movie) => (
                                <tr key={movie.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <img src={movie.thumbnail} alt={movie.title} className="h-20 w-14 rounded object-cover" />
                                            <div>
                                                <div className="font-medium text-gray-900">{movie.title}</div>
                                                <div className="text-sm text-gray-500">ID: #{movie.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {movie.type}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{movie.duration} phút</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 2024}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center">
                                            <Star className="h-4 w-4 text-yellow-400" />
                                            <span className="ml-1 text-sm text-gray-600">{movie.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">{movie.total_views}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center space-x-3">
                                            <Link to={`/admin/movies/${movie.id}`}>
                                                <button className="p-1 hover:text-blue-600">
                                                    <Eye className="h-5 w-5" />
                                                </button>
                                            </Link>
                                            <button className="p-1 hover:text-green-600">
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button className="p-1 hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (placeholder) */}
                <div className="flex items-center justify-between border-t px-6 py-3">
                    <div className="text-sm text-gray-500">
                        Hiển thị {filteredMovies.length > 0 ? '1-' + filteredMovies.length : 0} của {movies.length} phim
                    </div>
                    <div className="flex space-x-2">
                        <button className="rounded border p-2 hover:bg-gray-50">
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button className="rounded border bg-blue-50 px-3 py-1 text-blue-600">1</button>
                        <button className="rounded border px-3 py-1 hover:bg-gray-50">2</button>
                        <button className="rounded border px-3 py-1 hover:bg-gray-50">3</button>
                        <button className="rounded border p-2 hover:bg-gray-50">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movies;