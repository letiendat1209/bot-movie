import PropTypes from "prop-types";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container mx-auto dark:bg-slate-800 dark:text-gray-400">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.object,
};
export default DefaultLayout;
