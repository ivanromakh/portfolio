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
    return (
      <input
        type="text"
        className="form-control"
        value={this.getValue()}
        onChange={this.changeValue}
        placeholder="must not be empty"
      />
    );
  }
});

export default FormsyInput;