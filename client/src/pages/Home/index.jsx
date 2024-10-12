import Banner from "~/components/BannerSlider";
import MovieList from "~/components/MovieList";
function Home() {
  return (
    <div>
      <Banner />
      <div className="dark:bg-slate-800 dark:text-gray-400 pt-[20px] s360:px-[0px] s375:px-[0px] s412:px-[0px] s480:px-[10px] s640:px-[10px] s768:px-8 s800:px-[0px] s900:px-[40px] s1024:px-[40px] s1280:px-[40px] s1366:px-[40px]">
        <MovieList title={"Popular Movies"} />
        <MovieList title={"Top Rated Movies"} />
        <MovieList title={"Upcoming Movies"} />
        <MovieList title={"Trending Movies"} />
        <MovieList title={"Action Movies"} />
      </div>
    </div>
  );
}

export default Home;
