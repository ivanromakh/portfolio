import React from 'react';
import { Form } from 'formsy-react';
import PropTypes from 'prop-types';

import FormsyInput from '../FormElements/PorfolioInput.jsx';
import CreateAssetForm from './CreateAssetForm.jsx';
import AssetList from './AssetList.jsx';

import AssetStore from '../../stores/AssetStore';
import AssetActions from '../../actions/AssetActions';
import PortfolioActions from '../../actions/PortfolioActions';


function getStateFromFlux() {
  return {
    portfolio: AssetStore.getPortfolio(),
    canSubmit: false,
  };
}

/* eslint no-underscore-dangle: [2, { "allow": ["_onChange"] }]*/
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
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount() {
    AssetStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AssetStore.removeChangeListener(this._onChange);
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

  clearData() {
    PortfolioActions.loadPortfolios();
    this.props.closeModal();
  }

  submitFrom() {
    AssetActions.updatePortfolio(this.state.portfolio);
    this.props.closeModal();
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    const portfolio = this.state.portfolio;
    return (
      <div className="context">
        <CreateAssetForm portfolio={portfolio} />
        <div className="UpdateForm">
          <Form
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
                          maxLength: 'You can not type in more than 6 characters',
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
                          maxLength: 20,
                        }}
                        validationErrors={{
                          minLength: 'Pleasure type more than 3 characters',
                          maxLength: 'You can not type in more than 20 characters',
                        }}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <AssetList assets={portfolio.assets} />
            <div className="btn-group">
              <button
                type="submit"
                disabled={!this.state.canSubmit}
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.clearData}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

UpdateForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  portfolio: PropTypes.object.isRequired,
};

export default UpdateForm;
