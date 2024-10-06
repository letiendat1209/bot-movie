import PropTypes from "prop-types";
import Header from "../../../components/Header";
import Footer from "../../Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.string,
};
export default DefaultLayout;
