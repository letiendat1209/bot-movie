import FAQ from '~/pages/FAQ';
import Home from '~/pages/Home';
import MovieFilter from '~/pages/MovieCategories';
import MovieDetailPage from '~/pages/MovieDetail';
import Search from '~/pages/Search';
import UserProfile from '~/pages/UserProfile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: MovieDetailPage },
    { path: '/profile', component: UserProfile }, // /profile:id
    { path: '/search', component: Search },
    { path: '/filter', component: MovieFilter },
    { path: '/faq', component: FAQ },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
