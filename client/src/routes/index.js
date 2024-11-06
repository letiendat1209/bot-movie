import { AdminLayout } from '~/Container/Layouts';
import AdminDashBoard from '~/pages/Admin/AdminDashboard';
import Movies from '~/pages/Admin/Movies/ListMovies';
import FAQ from '~/pages/FAQ';
import Home from '~/pages/Home';
import Auth from '~/pages/Login';
import MovieFilter from '~/pages/MovieCategories';
import MovieDetail from '~/pages/MovieDetail';
import MoviePlayer from '~/pages/MoviePlayer';
import Search from '~/pages/Search';
import UserProfile from '~/pages/UserProfile';
import Pairs from '~/pages/UserProfile/pairs';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: UserProfile }, // /profile:id
    { path: '/search', component: Search },
    { path: '/anime', component: MovieFilter },
    { path: '/faq', component: FAQ },
    { path: '/movies/:idMovie', component: MovieDetail },
    { path: '/pairs', component: Pairs },
    { path: '/auth', component: Auth, layout: null },

    //test admin
];
const privateRoutes = [
    { path: '/episode/:id', component: MoviePlayer, roleRequired: ['user', 'admin'] },
    
    //
    { path: '/admin/adminDashboard', component: AdminDashBoard, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/movies', component: Movies, layout: AdminLayout, roleRequired: ['admin'] },
];

export { publicRoutes, privateRoutes };
