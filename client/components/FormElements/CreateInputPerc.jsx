import React from 'react';
import Formsy from 'formsy-react';

import { showInfo } from '../../utils/alerts';

const FormsyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    const value = event.currentTarget.value;
    if (value < 1) {
      showInfo("Percentage must be bigger then 1");
    } 
    if (value > this.props.max) {
      showInfo(`Percentage must be lower then ${this.props.max}`);
    }
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
          type="number"
          value={this.getValue()}
          className="form-control"
          onChange={this.changeValue}
          placeholder="Percentage"
          min="1"
          max={this.props.max}
        />
        <i className={glyphClass}></i>
        <span>{errorMessage}</span>
      </div>
    </div>
    );
  }
});

export default FormsyInput;