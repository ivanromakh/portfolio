import React from 'react';


class AssetViewList extends React.Component {
  render() {
    console.log(this.props.assets);
    return (
      <div className="AssetViewList">
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
              this.props.assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.longDescription} {asset.shortDescription}</td>
                  <td>{asset.percentage}</td>
                  <td>12</td>
                </tr>
              ))
            }
            <tr>
              <td className="text-right">Total</td>
              <td>100%</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AssetViewList;
