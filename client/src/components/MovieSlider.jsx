/* eslint-disable react/prop-types */
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CirclePlay } from 'lucide-react';

const MovieSlider = ({ movies, speed }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: speed,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1,
        cssEase: 'linear',
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="movie-slider-container my-4">
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className="p-2">
                        <div className="group relative transform overflow-hidden rounded-lg">
                            {/* Hình ảnh phim */}
                            <img className="h-72 w-full object-cover" src={movie.image} alt={movie.title} />
                            {/* Overlay tối khi hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                            {/* Nội dung thông tin phim */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-lg font-semibold">{movie.title}</h3>
                                <p className="text-sm">
                                    {movie.season && `Season ${movie.season}`} {movie.episode && `| Episode ${movie.episode}`}
                                </p>
                            </div>
                            {/* Nút hiển thị khi hover */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                whileHover={{ scale: 1.1 }} // Optional: hiệu ứng zoom nhẹ cho nút khi hover
                            >
                                <button className="flex items-center rounded-full bg-white px-4 py-2 text-black hover:bg-gray-300 hover:text-yellow-600">
                                    <span className="mr-2">XEM NGAY</span>
                                    <CirclePlay />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieSlider;
