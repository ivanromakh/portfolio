import React from 'react';
import PropTypes from 'prop-types';

import Portfolio from './Portfolio.jsx';


class PortfolioTable extends React.Component {
  renderPortfolios() {
    return (this.props.portfolios.map(portfolio =>
      (<Portfolio
        key={portfolio.id}
        portfolio={portfolio}
        openModalUpdate={this.props.openModalUpdate.bind(this, portfolio)}
        openModalDetail={this.props.openModalDetail.bind(this, portfolio)}
        handlePortfolioDelete={this.props.handlePortfolioDelete}
      />),
    ));
  }

  render() {
    return (
      <div className="panel panel-primary">
        <table className="table table-list">
          <thead>
            <tr>
              <th>Id</th>
              <th>Short Description</th>
              <th>Long Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.renderPortfolios() }
          </tbody>
        </table>
      </div>
    );
  }
}

PortfolioTable.propTypes = {
  openModalUpdate: PropTypes.func.isRequired,
  openModalDetail: PropTypes.func.isRequired,
  handlePortfolioDelete: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired,
};

export default PortfolioTable;
