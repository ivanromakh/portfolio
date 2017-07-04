import React from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';

import FormsyInput from '../FormElements/FormsyInput.jsx';
import InputPercentage from '../FormElements/InputPercentage.jsx';
import CreateAssetForm from './CreateAssetForm.jsx';
import AssetList from './AssetList.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';

import './UpdatePortfolioForm.less';

function getStateFromFlux() {
  return {
    portfolio: AssetStore.getPortfolio(),
    canSubmit: false,
  };
}

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolio: this.props.portfolio,
      canSubmit: false,
    };
    AssetActions.selectPortfolio(this.state.portfolio);
    this._onChange = this._onChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    AssetStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AssetStore.removeChangeListener(this._onChange);
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
 
  submit(model) {
    console.log(model);
  }

  validateForm(values) {
  }

  render() {
    const portfolio = this.state.portfolio;
    return (
      <div className="context">
        <CreateAssetForm portfolio={this.props.portfolio} />
        <div className="UpdateForm">
          <Formsy.Form 
            className="form-horizontal"
            onChange={this.validateForm}
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <h2>Portfolio Update</h2>
            <div className="row">
              <div className="col-xs-1">
                <label>Id</label>
              </div>
              <div className="col-xs-3">
                <label>Short Description</label>
              </div>
              <div className="col-xs-4">
                <label>Long Description</label>
              </div>

            </div>
            <div className="row">
              <div className="col-xs-1">
                <label className="form-control">{portfolio.id}</label>
              </div>
              <div className="col-xs-3">
                <FormsyInput 
                  name="shortDescription"
                  value={portfolio.shortDescription}
                  required
                />
              </div>
              <div className="col-xs-4">
                <FormsyInput
                  name="longDescription"
                  value={portfolio.longDescription}
                  required
                />
              </div>
            </div>
            <AssetList assets={portfolio.assets} />
            <div className="btn-group">
              <button 
                type="submit"
                disabled={!this.state.canSubmit}
                className="btn btn-primary btn-outline"
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-primary btn-outline"
                onClick={ this.props.closeModal }
              >
                Cancel
              </button>
            </div>
          </Formsy.Form>
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }
}

export default UpdateForm;
