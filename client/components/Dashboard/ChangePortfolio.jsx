import React from 'react';
import PropTypes from 'prop-types';

import Pie from './SvgCharPie.jsx';


class ChangePortfolio extends React.Component {
  render() {
    const { selected, length } = this.props;

    let data = [selected + 1, length - selected - 1];
    let colors = ['#aaaa00', 'grey'];

    if ((selected + 1) == length) {
      data = [100, 1];
      colors = ['#aaaa00', '#aaaa00'];
    }

    return (
      <div className="ChangePortfolio">
        <h1 className="text-center">Time</h1>
        <div className="text-center">
          <form className="form-inline">
            <div className="form-group">
              <button
                type="button"
                name="decrement"
                className="btn btn-primary left-button"
                onClick={this.props.selectPortfolio}
              >
          -
        </button>
            </div>
            <div className="form-group">
              <Pie
                data={data}
                radius={40}
                hole={30}
                colors={colors}
                strokeWidth={1}
                label={selected + 1}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                name="increment"
                className="btn btn-primary right-button"
                onClick={this.props.selectPortfolio}
              >
          +
        </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ChangePortfolio.propTypes = {
  selectPortfolio: PropTypes.func.isRequired,
};

export default ChangePortfolio;
