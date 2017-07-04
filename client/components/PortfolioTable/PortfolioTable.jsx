import React from 'react';

import Portfolio from './Portfolio.jsx';

import './PortfolioTable.less';


class PortfolioTable extends React.Component {
  renderPortfolios() {
    return (this.props.portfolios.map((portfolio) =>
      <Portfolio
        key={portfolio.id}
        portfolio={portfolio}
        openModalUpdate={this.props.openModalUpdate.bind(this, portfolio)}
        openModalDetail={this.props.openModalDetail.bind(this, portfolio)}
        handlePortfolioDelete={this.props.handlePortfolioDelete.bind(null, portfolio)}
      />
    ));
  }

  render() {
    return (
      <div className="container">
        <table className='table table-bordered'>
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

export default PortfolioTable;
