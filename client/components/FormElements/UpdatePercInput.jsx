import React from 'react';
import { Mixin } from 'formsy-react';

import { showInfo } from '../../utils/alerts';
import AssetActions from '../../actions/AssetActions';

const PercentageInput = React.createClass({
  mixins: [Mixin],
  changeValue(event) {
    const value = event.currentTarget.value;

    if (this.props.assets.length === 1) {
      showInfo('You can`t change percentage becouse there is only one asset');
      return true;
    }

    this.setValue(event.currentTarget.value);

    const assetId = event.currentTarget.name.split('-')[1];

    AssetActions.changePercentages(assetId, event.currentTarget.value, this.props.assets);
    return true;
  },

  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    let inputClass = 'has-success';

    if (this.showRequired()) {
      inputClass = 'has-feedback has-error';
    } else if (this.showError()) {
      inputClass = 'has-error';
    }

    const glyphClass = this.showRequired() ? 'glyphicon glyphicon-asterisk form-control-feedback' : 'invisible';

    const errorMessage = this.getErrorMessage();
    
    const value = this.getValue() || 1;
    return (
      <div className={inputClass}>
        <input
          type="number"
          value={value}
          name={this.props.name}
          className="form-control"
          onChange={this.changeValue}
          placeholder="Percentage"
          min="1"
          max={this.props.max}
        />
        <i className={glyphClass} />
        <span>{errorMessage}</span>
      </div>
    );
  },
});

export default PercentageInput;
