import MovieDetail from "../components/MovieDetail";
import Home from "../pages/Home";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/movie", component: MovieDetail },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
