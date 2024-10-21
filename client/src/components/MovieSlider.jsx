import { memo } from 'react';
import PropTypes from 'prop-types';
import '~/styles/components/Slider.css';
import { CirclePlay } from 'lucide-react';

const MovieSlider = memo(({ 
    movies = [], 
    speed = 10, 
    width = '300px', 
    height = '200px',
    reverse = true 
}) => {
    if (!movies.length) return null;

    const sliderStyles = {
        '--width': width,
        '--height': height,
        '--quantity': movies.length,
        '--speed': `${speed}s`,
    };

    return (
        <div className={`slider ${reverse ? 'reverse' : ''}`} style={sliderStyles}>
            <div className="list">
                {movies.map((movie, index) => (
                    <div 
                        className="item relative group" 
                        key={movie.id} 
                        style={{ '--position': index + 1 }}
                    >
                        <img 
                            src={movie.image} 
                            alt={movie.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center rounded-full bg-white px-4 py-2 text-black hover:bg-gray-300 hover:text-yellow-600">
                                    <span className="mr-2">XEM NGAY</span>
                                    <CirclePlay />
                                </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

MovieSlider.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    speed: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    reverse: PropTypes.bool
};

MovieSlider.displayName = 'MovieSlider';

export default MovieSlider;