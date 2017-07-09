import React from 'react';
import Formsy from 'formsy-react';

const FormsyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },

  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    const inputClass = this.showRequired()
      ? 'form-group has-feedback has-error'
      : this.showError()
      ? 'form-group has-error'
      : 'form-group has-success';

    const glyphClass = this.showRequired() ? "glyphicon glyphicon-asterisk form-control-feedback" : "invisible";

    const errorMessage = this.getErrorMessage();

    return (
      <div className="col-xs-4">
        <div className={inputClass}>
          
          <input
            type="text"
            className="form-control"
            value={this.getValue()}
            onChange={this.changeValue}
            placeholder={this.props.label}
          />
          <i className={glyphClass}></i>
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
});

export default FormsyInput;
