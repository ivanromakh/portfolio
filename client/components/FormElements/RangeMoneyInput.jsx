import React from 'react';
import Formsy from 'formsy-react';

import { showInfo } from '../../utils/alerts';
import PortfolioActions from '../../actions/PortfolioActions';

const RangeMoneyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {  
    this.setValue(event.currentTarget.value);
    PortfolioActions.changePortflioMoney(
      event.currentTarget.value*100,
      this.props.selected
    );
  },

  componentWillMount() {
    this.setValue(this.props.value);
  },

  render() {
    const value = this.getValue()/100 || 1;

    const errorMessage = this.getErrorMessage();
    return (
      <div className="range">
        <input
          type="range"
          name={this.props.name}
          className="form-control"
          value={value}
          min="1"
          max="10000"
          onChange={this.changeValue}
          placeholder={this.props.label}
        />
        <output id="range">{value*100}</output>
      </div>
    );
  },
});

export default RangeMoneyInput;
