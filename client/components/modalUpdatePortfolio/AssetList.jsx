import React from 'react';
import Formsy from 'formsy-react';

import AssetInput from '../FormElements/AssetInput.jsx';
import NumberInput from '../FormElements/UpdatePercInput.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';

import { showInfo } from '../../utils/alerts';

import './AssetList.less';

Formsy.addValidationRule('isLessThan', function (values, value, otherField) {
  return Number(value) <= otherField;
});

Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
  console.log(value, otherField);
  return Number(value) >= otherField;
});

class AssetList extends React.Component {
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
    const style = { width: '24%'};
    const style2 = { width: '4.1%', width: '50px' };

    return (assets.map((asset) => (
      <tr key={asset.id}>
        <td>{asset.id}</td>
        <td>
          <AssetInput  
            value={asset.shortDescription}
            name={`assetShDesc-${asset.id}`}
            validations={{
              minLength: 2,
              maxLength: 6,
            }}
            validationErrors={{
              minLength: 'Pleasure type more than 2 characters',
              maxLength: 'You can not type in more than 6 characters'
            }}
            required
          />
        </td>
        <td>
          <AssetInput
            name={`assetLnDesc-${asset.id}`}
            value={asset.longDescription}
            validations={{
              minLength: 3,
              maxLength: 20
            }}
            validationErrors={{
              minLength: 'Pleasure type more than 3 characters',
              maxLength: 'You can not type in more than 20 characters'
            }}
            required
          />
        </td>
        <td>
          <NumberInput
            type="number"
            className="form-control"
            assets= {this.props.assets}
            name={`percent-${asset.id}`}
            validations={{
              isLessThan: 100-this.props.assets.length + 1,
              isMoreThan: 1,
              isInt: true
            }}
            validationErrors={{
              isLessThan: `This must be lower then ${100-this.props.assets.length + 1}`,
              isMoreThan: 'This must be bigger then 1',
              isInt: 'Number must be insteger value'
            }} 
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
    const style = {width: '24%'};
    const style2 = {width: '4.1%', width: '50px'};
    return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Assets</h3>
          </div>
          <div>
          <table className="table asset-list table-bordered">
            <thead id="assets-thead">
              <tr>
              <th> Id </th>
              <th> Short Description  </th>
              <th> Long Description </th>
              <th> Percentage </th>
              <th> Actions </th>
              </tr>
            </thead>
            <tbody id="assets-tbody">
              {this.renderAssets(this.props.assets)}
            </tbody>
          </table>
        </div>
        </div>
    );
  }
}

export default AssetList;