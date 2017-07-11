import React from 'react';

import PropTypes from 'prop-types';

/* global confirm */

class Portfolio extends React.Component {
  renderActions() {
    return (
      <div className="portfolio-actions">
        <button className="btn btn-primary btn-outline" onClick={this.props.openModalDetail}>
          Details
        </button>
        <button
          className="btn btn-primary btn-outline"
          onClick={
          () => {
            if (confirm('Are you sure you want to delete this portfolio?')) {
              this.props.handlePortfolioDelete(this.props.portfolio);
            }
          }}
        >
          Delete
        </button>
        <button className="btn btn-primary btn-outline" onClick={this.props.openModalUpdate}>
          Update
        </button>
      </div>
    );
  }

  render() {
    return (
      <tr>
        <td>{this.props.portfolio.id}</td>
        <td>{this.props.portfolio.shortDescription}</td>
        <td>{this.props.portfolio.longDescription}</td>
        <td>
          {this.renderActions()}
        </td>
      </tr>
    );
  }
}

Portfolio.propTypes = {
  portfolio: PropTypes.object.isRequired,
  openModalDetail: PropTypes.func.isRequired,
  openModalUpdate: PropTypes.func.isRequired,
  handlePortfolioDelete: PropTypes.func.isRequired,
};

export default Portfolio;
