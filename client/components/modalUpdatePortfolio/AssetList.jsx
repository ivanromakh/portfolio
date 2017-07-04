import React from 'react';
import Formsy from 'formsy-react';

import AssetInput from '../FormElements/AssetInput.jsx';
import InputPercentage from '../FormElements/InputPercentage.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';

import { showInfo } from '../../utils/alerts';

class CreateAssetForm extends React.Component {
  constructor(props) {
    super(props);

    this.handlePercentChange = this.handlePercentChange.bind(this);
    this.handleDeleteAsset = this.handleDeleteAsset.bind(this);
  }

  handlePercentChange(event) {
    const value = event.currentTarget.value;
    const length = this.props.assets.length;
    const maxValue = 100 - length + 1;

    if(length == 1) {
      showInfo("Can`t change percentage, when there is only one asset");
      return true;
    }

    if(value < 1) {
      showInfo("Percentage must be bigger then 1");
      return true;
    }

    if( value > maxValue) {
      showInfo(`Percentage must be lower then ${maxValue}`);
      return true;
    }
    
    const assetId = event.currentTarget.name.split('-')[1];
    AssetActions.changePercentages(assetId, event.currentTarget.value, this.props.assets);
  }

  handleDeleteAsset(event) {
    const assetId = event.currentTarget.name.split('-')[1];
    AssetActions.deleteAsset(assetId, this.props.assets);
  }

  renderAssets(assets) {
    return (assets.map((asset) => (
      <tr key={asset.id}>
        <td className="col-xs-1">{asset.id}</td>
        <td className="col-xs-2">
          <AssetInput  
            value={asset.shortDescription}
            name={`assetShDesc-${asset.id}`}
            required
          />
        </td>
        <td className="col-xs-3">
          <AssetInput
            name={`assetLnDesc-${asset.id}`}
            value={asset.longDescription}
            required
          />
        </td>
        <td className="col-xs-2">
          <input
            type="number"
            className="form-control"
            onChange={this.handlePercentChange}
            name={`assetPerc-${asset.id}`}
            value={asset.percentage}
          />
        </td>
        <td className="col-xs-1">
          <button 
            type="button"
            className="btn btn-primary"
            name={`dellAsset-${asset.id}`}
            onClick={this.handleDeleteAsset}
          >
            Delete
          </button>
        </td>
      </tr>
    )));
  }

  render() {
    return (
      <div class="asset-list">
        <h3>Asset List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-xs-1">Id</th>
              <th className="col-xs-3">Short Description</th>
              <th className="col-xs-2">Long Description</th>
              <th className="col-xs-2">Percentage</th>
              <th className="col-xs-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderAssets(this.props.assets)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CreateAssetForm;