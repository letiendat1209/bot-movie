import Header from "./Header";

const movie = {
  id: 1,
  title: "Re:Zero : Trận chiến cuối cùng, người chiến thắng tất cả",
  season: 3,
  episode: 1,
  image:
    "https://ninoidol.vercel.app/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fd%2F1OiiMz4VfZ9JQuMn0FXiHzncAWiDrtonc%3Dw500-h750&w=320&q=80",
  rating: 8.5,
  status: "Ongoing",
};
function MovieDetail() {
  return (
    <div className="flex text-white px-10 py-5">
      <Header />
      <img className="w-1/3" src={movie.image} alt={movie.title} />
      <div className="ml-10">
        <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
        <p className="text-lg text-cyan-200">
          {movie.season} - {movie.episode}
        </p>
        <div className="flex items-center my-2">
          <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded mr-2">
            ★ {movie.rating}
          </span>
          <button className="bg-blue-600 px-4 py-2 rounded text-white">
            Chia sẻ
          </button>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-bold">Thông tin phim</h3>
          <p>Đạo diễn: Greg Jardin</p>
          <p>Quốc gia: Mỹ</p>
          <p>Khởi chiếu: 2024</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
