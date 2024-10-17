/* eslint-disable no-unused-vars */
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const movies = [
    {
        id: 1,
        title: 'Re:Zero : Trận chiến cuối cùng, người chiến thắng tất cả',
        season: 3,
        episode: 1,
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1OiiMz4VfZ9JQuMn0FXiHzncAWiDrtonc%3Dw500-h750&w=320&q=80',
        rating: 8.5,
        status: 'Ongoing',
        genre: 'Fantasy, Isekai',
        type: 'Anime',
    },
    {
        id: 2,
        title: 'Alya',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1zzn_ZUIIg1nJvo-6bJIzjfI_5alCDXzF%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Romance, Slice of Life',
        type: 'Anime',
    },
    {
        id: 3,
        title: 'Oshi no Ko',
        season: 3,
        episode: 1,
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1yglwAIqXFWw4iGv177w8PhARGlOcWZM0%3Dw500-h750&w=320&q=80',
        rating: 8.5,
        status: 'Ongoing',
        genre: 'Drama, Supernatural',
        type: 'Anime',
    },
    {
        id: 4,
        title: 'Shikanoko',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1-D3cYD7lwJUSoF2vI6WzbAmfsSSsUTmd%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Action, Fantasy',
        type: 'Anime',
    },
    {
        id: 5,
        title: 'Failure Frame',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1-Id_HKy0yKvwDyuhw5Q5wWJx9V1pNURR%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Fantasy, Isekai',
        type: 'Anime',
    },
    {
        id: 6,
        title: 'Boku no Hero Academia',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1ymAvRy7DZh2Zs6HCYVpcM_artem5vP75%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Action, Superhero',
        type: 'Anime',
    },
    {
        id: 7,
        title: 'Shangri-La Frontier',
        season: 2,
        episode: 1,
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1vzLn-OVblgIj_Om6fWCLIdcvyVzpLtnp%3Dw531-h7500&w=320&q=80',
        rating: 8.5,
        status: 'Ongoing',
        genre: 'Adventure, Fantasy',
        type: 'Anime',
    },
    {
        id: 8,
        title: 'Konosuba',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1zgxTRC3PCOx6T7AMnUmazdHm0CeNctd9%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Comedy, Fantasy',
        type: 'Anime',
    },
    {
        id: 9,
        title: 'Classroom Of The Elite',
        season: 3,
        episode: 1,
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1ziYkWMz7Lyzh1yDb2Pof1wXBx1ga807o%3Dw500-h750&w=320&q=80',
        rating: 8.5,
        status: 'Ongoing',
        genre: 'Psychological, Thriller',
        type: 'English 1-1',
    },
    {
        id: 10,
        title: 'Frieren',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1z3EMGUORpisbl-aXqKXOQAMEhLdzgVN0%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Adventure, Fantasy',
        type: 'Anime',
    },
    {
        id: 11,
        title: 'Chainsaw Man',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F10DCvGIKtkVbwtX7jCrbdcOChTqUF7e9L%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Action, Horror',
        type: 'Movie',
    },
    {
        id: 12,
        title: 'Wistoria',
        season: 1,
        episode: 'Complete',
        image: 'https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1-46_oZH36vlofSB_Viu53eYNCbtXM63G%3Dw500-h750&w=320&q=80',
        rating: 7.8,
        status: 'Complete',
        genre: 'Fantasy, Adventure',
        type: 'Anime',
    },
];

import MovieSlider from '~/components/MovieSlider';

const MovieFilter = () => {
    return (
        <div className="mx-4 mb-10 px-4 pt-20">
            <div className="my-[30px] pl-[10px] pr-[10px] s1024:p-0">
                <div className="genre scrollbar-hide relative flex snap-x snap-mandatory gap-2 overflow-x-auto s1024:grid s1024:grid-cols-10 s1280:grid-cols-12">
                    <a
                        href=""
                        className="genre-item activated relative shrink-0 snap-start snap-always rounded bg-red-600 px-2 py-1 text-[12px] text-white dark:bg-teal-800"
                    >
                        Tất cả anime
                    </a>
                </div>
            </div>

            <MovieSlider movies={movies} speed={5000} />

            {/* Danh sách các phim */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                {movies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <div className="group relative h-full w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <img
                                className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                                src={movie.image}
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
        </div>
    );
};

export default MovieFilter;
