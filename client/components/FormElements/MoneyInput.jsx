import React from 'react';
import Formsy from 'formsy-react';

import { showInfo } from '../../utils/alerts';
import PortfolioActions from '../../actions/PortfolioActions';

const MoneyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    if (this.showError()) {
      showInfo(this.getErrorMessage());
    }
  
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
    const value = this.getValue() || 1;

    return (
      <div className="form-group row">
        <label className="col-xs-4 col-form-label"> How much to insert </label>
        <div className="col-xs-8 input-group">
          <input
            type="number"
            className="form-control text-right"
            placeholder="invested money"
            aria-describedby="currency"
            onChange={this.changeValue}
            value={value}
          />
          <span className="input-group-addon" id="currency">Є</span>
        </div>
      </div>
    );
  },
});

export default MoneyInput;
