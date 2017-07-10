import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import Pie from './SvgCharPie.jsx';

import './Dashboard.less';

class AssetViewList extends React.Component {
  render() {
    const { selected, length } = this.props;
    
    let data = [selected, length-selected];
    let colors = ['yellow', 'grey'];

    if( selected == 0) {
    	data = [100, 1];
    	colors = ['grey', 'grey'];
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
          data={ data }
          radius={ 40 }
          hole={ 30 }
          colors={ colors }
          strokeWidth={ 1 }
          label={ selected }
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

export default AssetViewList;
