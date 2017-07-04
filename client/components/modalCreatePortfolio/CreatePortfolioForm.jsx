import React from 'react';
import Modal from 'react-modal';
import Formsy from 'formsy-react';
  
import FormsyInput from '../FormElements/FormsyInput.jsx';

import './CreatePortfolioForm.less';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    }

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  submit(model) {
    this.props.handlePortfolioCreate(model);
    this.props.closeModal();
  }

  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <div className="form-group row">
          <label className="col-sm-4">Short Description:</label>
          <div className="col-sm-8">
            <FormsyInput name="shortDes" required/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4">Long Description:</label>
          <div className="col-sm-8">
            <FormsyInput name="longDes" required/>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={!this.state.canSubmit} className="btn btn-primary btn-outline">
            Confirm
          </button>
          <button type="button" className="btn btn-primary btn-outline" onClick={ this.props.closeModal }>
            Close
          </button>
        </div>
      </Formsy.Form>
    );
  }
}

export default CreateForm;
