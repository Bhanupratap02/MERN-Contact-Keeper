/** @format */

import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";
const Navbar = (props) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContact } = contactContext;
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    clearContact();
    navigate("/login");
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <a onClick={onLogout} href="#!">
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </a>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
