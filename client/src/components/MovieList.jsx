import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Re:Zero : Trận chiến cuối cùng, người chiến thắng tất cả",
    season: 3,
    episode: 1,
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1OiiMz4VfZ9JQuMn0FXiHzncAWiDrtonc%3Dw500-h750&w=320&q=80",
    rating: 8.5,
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Alya",
    season: 1,
    episode: "Complete",
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1zzn_ZUIIg1nJvo-6bJIzjfI_5alCDXzF%3Dw500-h750&w=320&q=80",
    rating: 7.8,
    status: "Complete",
  },
  {
    id: 3,
    title: "Oshi no Ko",
    season: 3,
    episode: 1,
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1yglwAIqXFWw4iGv177w8PhARGlOcWZM0%3Dw500-h750&w=320&q=80",
    rating: 8.5,
    status: "Ongoing",
  },
  {
    id: 4,
    title: "Shikanoko",
    season: 1,
    episode: "Complete",
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1-D3cYD7lwJUSoF2vI6WzbAmfsSSsUTmd%3Dw500-h750&w=320&q=80",
    rating: 7.8,
    status: "Complete",
  },
  {
    id: 5,
    title: "Failure Frame",
    season: 1,
    episode: "Complete",
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1-Id_HKy0yKvwDyuhw5Q5wWJx9V1pNURR%3Dw500-h750&w=320&q=80",
    rating: 7.8,
    status: "Complete",
  },
  {
    id: 6,
    title: "Boku no Hero Academia",
    season: 1,
    episode: "Complete",
    image:
      "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1ymAvRy7DZh2Zs6HCYVpcM_artem5vP75%3Dw500-h750&w=320&q=80",
    rating: 7.8,
    status: "Complete",
  },
  // Thêm các phim khác
];

function MovieList({ title }) {
  return (
    <>
      <h2 className="uppercase text-3xl font-bold mb-4 text-cyan-200">
        {title}
      </h2>
      <h3 className="text-white mb-4">
        Find the best new and continuing simulcasts here!
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <Link to={`/movie`} key={index}>
            <div
              key={movie.id}
              className="w-full h-full relative group overflow-hidden"
            >
              <div className="relative w-full h-full cursor-pointer">
                {/* Ảnh */}
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  src={movie.image}
                  alt={movie.title}
                />

                {/* Lớp phủ tối */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                {/* Rating */}
                <div className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
                  ★ {movie.rating}
                </div>

                {/* Tiêu đề và nội dung */}
                <div className="absolute bottom-4 mx-2 flex flex-col items-start space-y-2">
                  <p className="uppercase text-sm text-white font-bold text-shadow hover:text-cyan-200 line-clamp-2">
                    {movie.title}
                  </p>
                  <p className="text-sm text-white text-shadow hover:text-yellow-300">
                    Season {movie.season} | Episode {movie.episode}
                  </p>
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
