import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

import AssetInput from '../FormElements/AssetInput.jsx';
import NumberInput from '../FormElements/UpdatePercInput.jsx';

import AssetActions from '../../actions/AssetActions';

import './AssetList.less';


Formsy.addValidationRule('isLessThan', (values, value, otherField) =>
  Number(value) <= Number(otherField),
);
Formsy.addValidationRule('isMoreThan', (values, value, otherField) =>
  Number(value) >= Number(otherField),
);

Formsy.addValidationRule('isSumValid', (values, value, list) => 
  list.reduce((sum, val) => sum + val) === 100
);

Formsy.addValidationRule('isSumLess', (values, value, list) => 
  !(list.reduce((sum, val) => sum + val) < 100)
);

Formsy.addValidationRule('isSumMore', (values, value, list) => 
  !(list.reduce((sum, val) => sum + val) > 100)
);

class AssetList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteAsset = this.handleDeleteAsset.bind(this);
  }

  handleDeleteAsset(event) {
    const assetId = event.currentTarget.name.split('-')[1];
    AssetActions.deleteAsset(assetId, this.props.assets);
  }

  renderAssets(assets) {
    const percentages = assets.map((asset) => asset.percentage);

    return (assets.map(asset => (
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
              maxLength: 'You can not type in more than 6 characters',
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
              maxLength: 20,
            }}
            validationErrors={{
              minLength: 'Pleasure type more than 3 characters',
              maxLength: 'You can not type in more than 20 characters',
            }}
            required
          />
        </td>
        <td>
          <NumberInput
            type="number"
            className="form-control"
            assets={assets}
            name={`percent-${asset.id}`}
            validations={{
              isInt: true,
              isLessThan: 100 - (assets.length - 1),
              isMoreThan: 1,
              isSumLess: percentages,
              isSumMore: percentages,
            }}
            validationErrors={{
              isInt: 'Number must be insteger value',
              isLessThan: `This must be lower then ${100 - (assets.length - 1)}`,
              isMoreThan: 'This must be bigger then 1',
              isSumLess: 'Sum of percentages is less then 100',
              isSumMore: 'Sum of percentages is more then 100',
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
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Assets</h3>
        </div>
        <div>
          <table className="table asset-list table-bordered">
            <thead id="assets-thead">
              <tr>
                <th>Id</th>
                <th>Short Description</th>
                <th>Long Description</th>
                <th>Percentage</th>
                <th>Actions</th>
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

AssetList.propTypes = {
  assets: PropTypes.array.isRequired,
};

export default AssetList;
