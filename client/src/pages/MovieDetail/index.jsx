import { Star, Clock, Share2, MoreVertical } from 'lucide-react';

export default function MovieDetail() {
    return (
        <div className="min-h-screen text-white">
            {/* Hero Image Section */}
            <div className="relative h-[400px]">
                <img
                    src="https://image.tmdb.org/t/p/original/jbTqU6BJMufoMnPSlO4ThrcXs3Y.jpg"
                    alt="Movie cover"
                    className="h-full w-full object-cover opacity-50"
                />

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
                    <img
                        src="https://image.tmdb.org/t/p/w185/y0HUz4eUNUe3TeEd8fQWYazPaC7.jpg"
                        alt="Movie poster"
                        className="h-72 w-48 rounded-lg shadow-lg"
                    />
                    {/* Movie Details */}
                    <div className="mt-auto py-14">
                        <h1 className="mb-2 text-4xl font-bold">The First Years</h1>
                        <div className="my-6 flex gap-2">
                            <span className="rounded-full border border-white px-4 py-1 text-sm">SOAP</span>
                            <span className="rounded-full border border-white px-4 py-1 text-sm">DRAMA</span>
                        </div>
                        <button className="flex items-center rounded-full border border-gray-500 bg-blue-600 px-8 py-2 text-white">
                            <span>WATCH</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-24 px-[10%]">
                {/* Tabs */}
                <div className="mb-6 flex gap-8 border-b border-gray-700">
                    <button className="border-b-2 border-white pb-2">Overall</button>
                    <button className="pb-2 text-gray-400">Cast</button>
                    <button className="pb-2 text-gray-400">Reviews</button>
                    <button className="pb-2 text-gray-400">Seasons</button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-[100px_1fr] gap-8">
                    <div className="flex flex-col items-center">
                        <div className="text-4xl font-bold text-blue-500">5.0</div>
                        <div className="text-sm text-gray-400">RATING</div>
                    </div>
                    <div className="mr-auto flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span className="text-2xl">10</span>
                        </div>
                        <div className="mt-auto text-sm text-gray-400">EP LENGTH</div>
                    </div>
                </div>

                {/* Story */}
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold">STORY</h2>
                    <p className="text-gray-300">
                        The First Years is a Dutch series for young people in which real-life situations are recreated. The series sheds
                        light on subjects that pupils in the first year of secondary school may be confronted with.
                    </p>
                </div>

                {/* Details */}
                <div className="mt-8">
                    <h2 className="mb-4 text-xl font-bold">DETAILS</h2>
                    <div className="space-y-2 text-gray-300">
                        <p>Status: Returning Series</p>
                        <p>Last air date: 2024-10-17</p>
                        <p>Spoken language: Dutch</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
