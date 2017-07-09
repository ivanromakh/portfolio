import React from 'react';
import Formsy from 'formsy-react';

import AssetInput from '../FormElements/AssetInput.jsx';
import NumberInput from '../FormElements/UpdatePercInput.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';

import { showInfo } from '../../utils/alerts';

import './AssetList.less';

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
    
    const assetId = event.currentTarget.id.split('-')[1];
  }

  handleDeleteAsset(event) {
    const assetId = event.currentTarget.name.split('-')[1];
    AssetActions.deleteAsset(assetId, this.props.assets);
  }

  renderAssets(assets) {
    Formsy.addValidationRule('isPositive', function (values, value) {
      return value >= 0;
    });

    return (assets.map((asset) => (
      <tr key={asset.id}>
        <td>{asset.id}</td>
        <td>
          <AssetInput  
            value={asset.shortDescription}
            name={`assetShDesc-${asset.id}`}
            required
          />
        </td>
        <td>
          <AssetInput
            name={`assetLnDesc-${asset.id}`}
            value={asset.longDescription}
            required
          />
        </td>
        <td>
          <NumberInput
            type="number"
            className="form-control"
            onChange={this.handlePercentChange}
            name={`percent-${asset.id}`}
            value={asset.percentage}
            required
          />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            name={`dellAsset-${asset.id}`}
            onClick={this.handleDeleteAsset}
            required
          >
            Delete
          </button>
        </td>
      </tr>
    )));
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Assets</h3>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Short Description</th>
              <th>Long Description</th>
              <th>Percentage</th>
              <th>Actions</th>
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