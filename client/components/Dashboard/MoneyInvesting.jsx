import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formsy-react';

import MoneyInput from '../FormElements/MoneyInput.jsx';
import RangeMoneyInput from '../FormElements/RangeMoneyInput.jsx';

class MoneyInvesting extends React.Component {
  constructor(props) {
    super(props);

    this.state = { invested: 0 };
  }

  render() {
    return (
      <div className="money-import">
        <Form>
          <MoneyInput
            name="money-input"
            value={this.props.money}
            selected={this.props.selected}
            validations={{
              isLessThan: 1000000,
              isMoreThan: 1,
              isInt: true,
            }}
            validationErrors={{
              isLessThan: `This must be lower then ${1000000}`,
              isMoreThan: 'This must be bigger then 1',
              isInt: 'Number must be insteger value',
            }}
          />
          <div className="form-group row">
            <RangeMoneyInput
              name="money-range"
              value={this.props.money}
              selected={this.props.selected}
              validations={{
                isLessThan: 1000000,
                isMoreThan: 1,
                isInt: true,
              }}
              validationErrors={{
                isLessThan: `This must be lower then ${1000000}`,
                isMoreThan: 'This must be bigger then 1',
                isInt: 'Number must be insteger value',
              }}
            />
          </div>
        </Form>
      </div>
    );
  }
}

MoneyInvesting.propTypes = {
  setMoney: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  money: PropTypes.number.isRequired,
};

export default MoneyInvesting;
