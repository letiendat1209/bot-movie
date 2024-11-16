import { useState, useEffect } from 'react';
import { getAllGenres } from '~/services/genres';

const FilterSortPanel = () => {
    const [sortOpen, setSortOpen] = useState(true);
    const [filterOpen, setFilterOpen] = useState(true);
    const [minVal, setMinVal] = useState(30);
    const [maxVal, setMaxVal] = useState(140);
    const [startDate, setStartDate] = useState('2002-11-04');
    const [endDate, setEndDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });

    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getAllGenres();
                setGenres(data);  // Update state to store genres as an array of objects
            } catch (error) {
                console.error('There was an error fetching the genre data!', error);
            }
        };
        fetchGenres();
    }, []);

    const [selectedGenres, setSelectedGenres] = useState([1, 2]); // Store genre ids

    useEffect(() => {
        if (minVal > maxVal) setMinVal(maxVal);
        if (maxVal < minVal) setMaxVal(minVal);
    }, [minVal, maxVal]);

    // Reset all filters
    const resetFilters = () => {
        setMinVal(30);
        setMaxVal(140);
        setStartDate('2002-11-04');
        setEndDate(new Date().toISOString().split('T')[0]);
        setSelectedGenres([]);
    };

    return (
        <div className="w-full rounded-lg bg-[#333335] p-4 text-white">
            {/* Sort Section */}
            <div className="mb-4">
                <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="mb-4 flex w-full items-center justify-between text-base font-normal"
                >
                    Sort
                    <svg
                        className={`h-5 w-5 transform transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {sortOpen && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-400">Sort results by</p>
                        <select className="w-full cursor-pointer appearance-none rounded bg-[#49494b] px-3 py-2 text-sm">
                            <option value="popularity">Most popular</option>
                            <option value="rating">Highest rating</option>
                            <option value="release_date">Newest first</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Filter Section */}
            <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="mb-4 flex w-full items-center justify-between border-t border-[#49494b] pt-4 text-base font-normal"
            >
                Filter
                <svg
                    className={`h-5 w-5 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {filterOpen && (
                <div className="space-y-6">
                    {/* Genres */}
                    <div>
                        <p className="mb-3 text-sm text-gray-400">Genres</p>
                        <div className="custom-scrollbar flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-2">
                            {genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    className={`rounded-full px-4 py-1 text-sm ${
                                        selectedGenres.includes(genre.id)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-[#49494b] text-gray-300 hover:bg-[#555557]'
                                    }`}
                                    onClick={() => {
                                        setSelectedGenres((prev) =>
                                            prev.includes(genre.id)
                                                ? prev.filter((g) => g !== genre.id)
                                                : [...prev, genre.id]
                                        );
                                    }}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Runtime */}
                    <div>
                        <p className="mb-3 text-sm text-gray-400">Runtime</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-300">
                                <span>From {minVal} min</span>
                                <span>To {maxVal} min</span>
                            </div>
                            <div className="relative h-4">
                                <div className="absolute top-[45%] h-0.5 w-full rounded bg-[#49494b]"></div>
                                <div
                                    className="absolute top-[45%] h-0.5 rounded bg-blue-500"
                                    style={{
                                        left: `${(minVal / 200) * 100}%`,
                                        right: `${100 - (maxVal / 200) * 100}%`,
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={minVal}
                                    onChange={(e) => setMinVal(Number(e.target.value))}
                                    className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                                    style={{ zIndex: 3 }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={maxVal}
                                    onChange={(e) => setMaxVal(Number(e.target.value))}
                                    className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                                    style={{ zIndex: 4 }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Release Dates */}
                    <div>
                        <p className="mb-3 text-sm text-gray-400">Release Dates</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="mr-2">From</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-[75%] rounded bg-[#49494b] px-3 py-1 text-sm text-gray-300"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="mr-2">To</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-[75%] rounded bg-[#49494b] px-3 py-1 text-sm text-gray-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reset Filters Button */}
            <button
                onClick={resetFilters}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterSortPanel;
