import React from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';

import FormsyInput from '../FormElements/PorfolioInput.jsx';
import CreateAssetForm from './CreateAssetForm.jsx';
import AssetList from './AssetList.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';
import PortfolioActions from '../../actions/PortfolioActions';

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
  
  clearData() {
    PortfolioActions.loadPortfolios();
    this.props.closeModal();
  }
 
  submitFrom() {
    const data = AssetActions.updatePortfolio(this.state.portfolio);
    this.props.closeModal();
  }

  render() {
    const portfolio = this.state.portfolio;
    return (
      <div className="context">
        <CreateAssetForm portfolio={this.props.portfolio} />
        <div className="UpdateForm">
          <Formsy.Form 
            className="form-horizontal"
            onValidSubmit={this.submitFrom.bind(this)}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Portfolio</h3>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Short Description</th>
                    <th>Long Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{portfolio.id}</td>
                    <td>
                      <FormsyInput 
                        name="shortDescription"
                        label="shortDescription"
                        value={portfolio.shortDescription}
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
                      <FormsyInput
                        name="longDescription"
                        label="longDescription"
                        value={portfolio.longDescription}
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
                  </tr>
                </tbody>
              </table>
            </div>
            <AssetList assets={portfolio.assets} />
            <div className="btn-group ol-lg-12">
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
                onClick={ this.clearData }
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
