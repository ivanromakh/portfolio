import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a name="portfolio" onClick={this.props.changeView}>Portfolios</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a name="dashboard" onClick={this.props.changeView}>Dashboard</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
