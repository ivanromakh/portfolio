import React from 'react';
import Formsy from 'formsy-react';

import { showInfo, showError } from '../../utils/alerts';
import AssetActions from '../../actions/AssetActions';

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
    //AssetActions.changePercentages(assetId, event.currentTarget.value, this.props.assets);
  },

  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    const inputClass = this.showRequired()
      ? 'has-feedback has-error'
      : this.showError()
      ? 'has-error'
      : 'has-success';

    if(this.showError()) {
      showError(this.getErrorMessage());
    }

    const glyphClass = this.showRequired() ? "glyphicon glyphicon-asterisk form-control-feedback" : "invisible";

    const errorMessage = this.getErrorMessage();
    console.log(this.getValue());

    return (
        <div className={inputClass}>
        <input 
          type="number"
          value={this.getValue()}
          name={this.props.name}
          className="form-control"
          onChange={this.changeValue}
          placeholder="Percentage"
          min="1"
          max={this.props.max}
        />
        <i className={glyphClass}></i>
    </div>
    );
  }
});

export default FormsyInput;