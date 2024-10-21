import Banner from '~/components/BannerSlider';
import MovieList from '~/components/MovieList';
import MovieSlider from '~/components/MovieSlider';

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
function Home() {
    return (
        <>
            <Banner />
            <div className="container mx-auto">
                <div className="pt-[20px] s360:px-[0px] s375:px-[0px] s412:px-[0px] s480:px-[10px] s640:px-[10px] s768:px-8 s800:px-[0px] s900:px-[40px] s1024:px-[40px] s1280:px-[40px] s1366:px-[40px]">
                    <MovieSlider movies={movies} speed={10000} />
                    <MovieList title={'Popular Movies'} />
                    <MovieList title={'Top Rated Movies'} />
                    <MovieList title={'Upcoming Movies'} />
                    <MovieList title={'Trending Movies'} />
                    <MovieList title={'Action Movies'} />
                </div>
            </div>
        </>
    );
}

export default Home;
