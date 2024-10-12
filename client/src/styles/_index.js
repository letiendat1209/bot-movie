import PropTypes from "prop-types";

import "./base.css";
function GlobalStyles({ children }) {
  return children;
}
GlobalStyles.propTypes = {
  children: PropTypes.object,
};
export default GlobalStyles;
