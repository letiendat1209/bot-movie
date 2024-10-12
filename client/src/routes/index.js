import MovieDetailPage from "~/pages/MovieDetail";

import Home from "~/pages/Home";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/movie", component: MovieDetailPage },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
