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
    let inputClass = 'form-group has-success';

    if (this.showRequired()) {
      inputClass = 'form-group has-feedback has-error';
    } else if (this.showError()) {
      inputClass = 'form-group has-error';
    }

    const glyphClass = this.showRequired()
      ? 'glyphicon glyphicon-asterisk form-control-feedback'
      : 'invisible';

    const errorMessage = this.getErrorMessage();

    return (
      <div className="col-xs-4">
        <div className={inputClass}>
          <div className="row">
            <input
              type="text"
              className="form-control"
              value={this.getValue()}
              onChange={this.changeValue}
              placeholder={this.props.label}
            />
            <i className={glyphClass} />
          </div>
          <div className="row">
            <span className="text-danger">{errorMessage}</span>
          </div>
        </div>
      </div>
    );
  },
});

export default FormsyInput;
