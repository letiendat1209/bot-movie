import FAQ from '~/pages/FAQ';
import Home from '~/pages/Home';
import MovieFilter from '~/pages/MovieCategories';
import MovieDetail from '~/pages/MovieDetail';
import MoviePlayer from '~/pages/MoviePlayer';
import Search from '~/pages/Search';
import UserProfile from '~/pages/UserProfile';
import Pairs from '~/pages/UserProfile/pairs';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: MoviePlayer },
    { path: '/profile', component: UserProfile }, // /profile:id
    { path: '/search', component: Search },
    { path: '/anime', component: MovieFilter },
    { path: '/faq', component: FAQ },
    { path: '/movieDetail', component: MovieDetail },
    { path: '/pairs', component: Pairs },

    //test admin
    // { path: '/admin', component: Admin },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
