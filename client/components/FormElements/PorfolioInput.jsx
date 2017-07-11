import React from 'react';
import Formsy from 'formsy-react';

import AssetActions from '../../actions/AssetActions';

const FormsyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);

    const description = event.currentTarget.value;
    const data = event.currentTarget.name;

    AssetActions.changePorfolioDescription(description, data);
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

    const glyphClass = this.showRequired()
      ? 'glyphicon glyphicon-asterisk form-control-feedback'
      : 'invisible';

    const errorMessage = this.getErrorMessage();
    return (
      <div className={inputClass}>
        <input
          type="text"
          name={this.props.name}
          className="form-control"
          value={this.getValue()}
          onChange={this.changeValue}
          placeholder={this.props.label}
        />
        <i className={glyphClass} />
        <span className="text-danger">{errorMessage}</span>
      </div>
    );
  },
});

export default FormsyInput;
