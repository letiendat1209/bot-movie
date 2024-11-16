import { AdminLayout } from '~/Container/Layouts';
import AdminDashBoard from '~/pages/Admin/AdminDashboard';
import AddNewEpisode from '~/pages/Admin/Movies/AddNewEpisode';
import AddNewMovies from '~/pages/Admin/Movies/AddNewMovies';
import EpisodeDetail from '~/pages/Admin/Movies/episodeDetail';
import Movies from '~/pages/Admin/Movies/ListMovies';
import MovieDetailAdmin from '~/pages/Admin/Movies/MovieDetailAdmin';
import ListUser from '~/pages/Admin/Users/ListUser';
import UserDetail from '~/pages/Admin/Users/UserDetail';
import FAQ from '~/pages/FAQ';
import Home from '~/pages/Home';
import Auth from '~/pages/Login';
import MovieFilter from '~/pages/MovieCategories';
import MovieDetail from '~/pages/MovieDetail';
import MoviePlayer from '~/pages/MoviePlayer';
import Search from '~/pages/Search';
import UserProfile from '~/pages/UserProfile';
import Flashcards from '~/pages/UserProfile/Flashcard';
import FlashcardList from '~/pages/UserProfile/FlashcardList';
import Pairs from '~/pages/UserProfile/pairs';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: UserProfile }, // /profile:id
    { path: '/search', component: Search },
    { path: '/type/:type', component: MovieFilter },
    { path: '/faq', component: FAQ },
    { path: '/movies/:idMovie', component: MovieDetail },
    { path: '/pairs', component: Pairs },

    { path: '/flashcards', component: Flashcards },
    { path: '/flashcardsList', component: FlashcardList },


    { path: '/auth', component: Auth, layout: null },

    //test admin
];
const privateRoutes = [
    { path: '/episode/:id', component: MoviePlayer, roleRequired: ['user', 'admin'] },

    //
    { path: '/admin/adminDashboard', component: AdminDashBoard, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/movies', component: Movies, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/movies/:idMovie', component: MovieDetailAdmin, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/movies/add', component: AddNewMovies, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/AddNewEpisode/:id', component: AddNewEpisode, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/episodeDetail/:id', component: EpisodeDetail, layout: AdminLayout, roleRequired: ['admin'] },

    { path: '/admin/listUsers', component: ListUser, layout: AdminLayout, roleRequired: ['admin'] },
    { path: '/admin/userDetail/:id', component: UserDetail, layout: AdminLayout, roleRequired: ['admin'] },
];

export { publicRoutes, privateRoutes };
