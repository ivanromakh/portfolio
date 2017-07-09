import React from 'react';

import Portfolio from './Portfolio.jsx';

import './PortfolioTable.less';


class PortfolioTable extends React.Component {
  componentDidMount() {
    var $table = $('table.scroll'),
    $bodyCells = $table.find('tbody tr:first').children(),
    colWidth;

// Adjust the width of thead cells when window resizes
$(window).resize(function() {
    // Get the tbody columns width array
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();
    
    // Set the width of thead columns
    $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
    });    
}).resize(); // Trigger resize handler
  }

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
      <div className="panel panel-primary">
        <table className='table scroll'>
          <thead>
            <tr>
              <th className="col-xs-2">Id</th>
              <th className="col-xs-3">Short Description</th>
              <th className="col-xs-4">Long Description</th>
              <th className="col-xs-8">Actions</th>

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
