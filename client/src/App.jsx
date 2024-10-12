import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "~/Container/Layouts";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
function App() {
  return (
    <Router>
      <div className="App bg-white dark:bg-slate-800">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
