import React from 'react';
import Formsy from 'formsy-react';

import PortfolioActions from '../../actions/PortfolioActions';


const RangeMoneyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);

    PortfolioActions.changePortflioMoney(
      event.currentTarget.value,
      this.props.selected,
    );
  },

  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    const value = this.getValue();

    const errorMessage = this.getErrorMessage();
    return (
      <div className="range">
        <input
          type="range"
          name={this.props.name}
          className="form-control"
          value={value}
          min="1"
          max="1000000"
          onChange={this.changeValue}
          placeholder={this.props.label}
        />
        <output id="range">{value}</output>
      </div>
    );
  },
});

export default RangeMoneyInput;
