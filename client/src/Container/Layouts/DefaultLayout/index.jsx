import PropTypes from 'prop-types';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.object,
};
export default DefaultLayout;
