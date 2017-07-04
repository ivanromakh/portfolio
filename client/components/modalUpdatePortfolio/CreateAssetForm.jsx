import React from 'react';
import Formsy from 'formsy-react';

import FormsyInput from '../FormElements/FormsyInput.jsx';
import InputPercentage from '../FormElements/InputPercentage.jsx';

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

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  handleCreateAsset(asset) {
    const assets = this.props.portfolio.assets;
    AssetActions.createAsset(asset, assets);
  }

  render() {
  	console.log(this.props.portfolio);
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
          <div className="form-group">
            <label>Short Description</label>
            <FormsyInput name="shortDescription" placeholder="must not be empty" required/>
          </div>
          <div className="form-group">
            <label>Long Description</label>
            <FormsyInput name="longDescription" placeholder="must not be empty" required/>
          </div>
          <div className="form-group">
            <label>Percentage</label>
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