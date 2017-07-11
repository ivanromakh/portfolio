import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';

import FormsyInput from '../FormElements/CreatePortfInput.jsx';

import './CreatePortfolioForm.less';


class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
    };

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
      <Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        className="form-signin"
      >
        <h2 className="form-signin-heading">Create Portfolio</h2>
        <br />
        <FormsyInput
          label="Short Description"
          name="shortDes"
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
          label="Long Description"
          name="longDes"
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
        <br /><br />
        <div className="btn-group col-lg-12">
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className="btn btn-lg btn-primary col-lg-6"
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-lg btn-primary col-lg-6"
            onClick={this.props.closeModal}
          >
            Close
          </button>
        </div>
      </Form>
    );
  }
}

CreateForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handlePortfolioCreate: PropTypes.func.isRequired,
};

export default CreateForm;
