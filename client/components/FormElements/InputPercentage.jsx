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
    return (
      <input 
        type="number"
        value={this.getValue()}
        className="form-control"
        onChange={this.changeValue}
        min="1"
        max={this.props.max}
      />
    );
  }
});

export default FormsyInput;