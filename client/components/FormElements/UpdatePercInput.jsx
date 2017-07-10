import React from 'react';
import Formsy from 'formsy-react';

import { showInfo, showError } from '../../utils/alerts';
import AssetActions from '../../actions/AssetActions';

const PercentageInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    const value = event.currentTarget.value;
    if (value < 1) {
      showInfo("Percentage must be bigger then 1");
    } 
    if (value > this.props.max) {
      showInfo(`Percentage must be lower then ${this.props.max}`);
    }

    if (this.props.assets.length == 1) {
      showInfo("You can`t change percentage becouse there is only one asset");
      return true;
    }

    this.setValue(event.currentTarget.value);
    
    const data = event.currentTarget.name.split('-');
    const assetId = data[1];

    AssetActions.changePercentages(assetId, event.currentTarget.value, this.props.assets);
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

    const glyphClass = this.showRequired() ? "glyphicon glyphicon-asterisk form-control-feedback" : "invisible";

    const errorMessage = this.getErrorMessage();

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
        <span>{errorMessage}</span>
    </div>
    );
  }
});

export default PercentageInput;