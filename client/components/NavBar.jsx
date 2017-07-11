import React from 'react';
import PropTypes from 'prop-types';


const NavBar = props => (
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li>
            <a
              name="portfolio"
              role="button"
              onClick={props.changeView}
            >
              Portfolios
            </a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a
              name="dashboard"
              role="button"
              onClick={props.changeView}
            >
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

NavBar.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default NavBar;
