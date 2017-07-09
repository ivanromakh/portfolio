import React from 'react';


class Portfolio extends React.Component {


  renderActions() {
    return (
      <div className="portfolio-actions">
        <button className="btn btn-primary btn-outline" onClick={this.props.openModalDetail}>
          Details
        </button>
        <button className="btn btn-primary btn-outline" onClick={
          () => {
            if(confirm('Are you sure you want to delete this portfolio?')) {
              this.props.handlePortfolioDelete()
            };
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
        <td className="col-xs-2">{this.props.portfolio.id}</td>
        <td className="col-xs-3">{this.props.portfolio.shortDescription}</td>
        <td className="col-xs-4">{this.props.portfolio.longDescription}</td>
        <td className="col-xs-8">
          {this.renderActions()}
        </td>
      </tr>
    )
  }
}

export default Portfolio;
