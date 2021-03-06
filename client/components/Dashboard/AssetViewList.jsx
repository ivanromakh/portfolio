import React from 'react';
import PropTypes from 'prop-types';

class AssetViewList extends React.Component {
  render() {
    return (
      <div className="AssetViewList">
        <div className="panel panel-primary">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Asset</th>
              <th>%</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.assets.map(asset => (
                <tr key={asset.id}>
                  <td>{asset.longDescription} {asset.shortDescription}</td>
                  <td>{asset.percentage}</td>
                  <td>{(this.props.money * asset.percentage) / 100}</td>
                </tr>
              ))
            }
            <tr>
              <td className="text-right">Total</td>
              <td>100%</td>
              <td>{this.props.money}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

AssetViewList.propTypes = {
  money: PropTypes.number.isRequired,
};

export default AssetViewList;
