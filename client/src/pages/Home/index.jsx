import Banner from "../../components/BannerSlider";
import MovieList from "../../components/MovieList";

function Home() {
  return (
    <div>
      <Banner />
      <MovieList title={"Popular Movies"} />
      <MovieList title={"Top Rated Movies"} />
      <MovieList title={"Upcoming Movies"} />
      <MovieList title={"Trending Movies"} />
      <MovieList title={"Action Movies"} />
    </div>
  );
}

export default Home;
