import Home from "~/pages/Home";
import MovieDetailPage from "~/pages/MovieDetail";
import UserProfile from '~/pages/UserProfile';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/movie', component: MovieDetailPage },
    { path: '/profile', component: UserProfile }, // /profile:id
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
