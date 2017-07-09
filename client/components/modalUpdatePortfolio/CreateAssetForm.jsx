import React from 'react';
import Formsy from 'formsy-react';

import FormsyInput from '../FormElements/InlineInput.jsx';
import InputPercentage from '../FormElements/CreateInputPerc.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';

import './CreateAssetForm.less';

function getStateFromFlux() {
  return {
    portfolios: AssetStore.getPortfolio(),
    canSubmit: false,
  };
}

class CreateAssetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromFlux();

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleCreateAsset = this.handleCreateAsset.bind(this);
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton(event) {
  	console.log(event);
    this.setState({
      canSubmit: false
    });
  }

  handleCreateAsset(asset) {
    const assets = this.props.portfolio.assets;
    AssetActions.createAsset(asset, assets);
  }

  render() {
  	const length = this.props.portfolio.assets.length;
    return (
      <div className="CreateAssetForm">
        <h3>Create Asset</h3>
        <Formsy.Form 
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
              maxLength: 'You can not type in more than 6 characters'
            }}
            required
          />
          <FormsyInput
            name="longDescription"
            label="Long Description"
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
          <div className="form-group">
            <InputPercentage name="percentage" max={100-length} required/>
          </div>
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className="btn btn-primary btn-outline"
            type="submit"
          >
            Create
          </button>
        </Formsy.Form>
      </div>
    );
  }
}

export default CreateAssetForm;