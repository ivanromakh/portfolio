import React from 'react';
import { Form } from 'formsy-react';
import PropTypes from 'prop-types';

import FormsyInput from '../FormElements/InlineInput.jsx';
import InputPercentage from '../FormElements/CreatePercInput.jsx';

import AssetActions from '../../actions/AssetActions';


class CreateAssetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { canSubmit: false };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleCreateAsset = this.handleCreateAsset.bind(this);
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  handleCreateAsset(asset) {
    asset.percentage = Number(asset.percentage);
    const assets = this.props.portfolio.assets;
    AssetActions.createAsset(asset, assets);
  }

  render() {
    const length = this.props.portfolio.assets.length;
    return (
      <div className="CreateAssetForm">
        <h3>Create Asset</h3>
        <Form
          className="form-inline"
          onValidSubmit={this.handleCreateAsset}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
        >
          <FormsyInput
            name="shortDescription"
            label="Short Description"
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
          <FormsyInput
            name="longDescription"
            label="Long Description"
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
          <div className="form-group">
            <InputPercentage
              name="percentage"
              validations={{
                isLessThan: 100 - (length + 1),
                isMoreThan: 1,
                isInt: true,
              }}
              validationErrors={{
                isLessThan: `This must be lower then ${100 - (length + 1)}`,
                isMoreThan: 'This must be bigger then 1',
                isInt: 'Number must be insteger value',
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className="btn btn-primary btn-outline"
          >
            Create
          </button>
        </Form>
      </div>
    );
  }
}

CreateAssetForm.propTypes = {
  portfolio: PropTypes.object.isRequired,
};

export default CreateAssetForm;
