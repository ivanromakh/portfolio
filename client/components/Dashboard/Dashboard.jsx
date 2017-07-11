import React from 'react';
import PropTypes from 'prop-types';

import DoughnutChart from './DoughnutChart.jsx';
import AssetViewList from './AssetViewList.jsx';
import ChangePortfolio from './ChangePortfolio.jsx';
import MoneyInvesting from './MoneyInvesting.jsx';

import { showInfo } from '../../utils/alerts';

import './Dashboard.less';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
     
    this.state = this.props.portfolios[0];

    this.selectPortfolio = this.selectPortfolio.bind(this);
  }

  selectPortfolio(event) {
    const type = event.currentTarget.name;
    let { id } = this.state;
    const { length } = this.props.portfolios;

    if (type === 'increment') {
      if (id <= length - 2) {
        id += 1;
      } else {
        showInfo('This is the last portfolio');
        return false;
      }
    } else if (type === 'decrement') {
      if (id >= 1) {
        id -= 1;
      } else {
        showInfo('This is the first portfolio');
        return false;
      }
    }

    this.setState(this.props.portfolios[id]);
  }

  render() {
    const { assets, money, id } = this.state;
    return (
      <div className="App">
        <div className="row dashboard">
          <div className="col-xs-4">
            <DoughnutChart assets={this.props.portfolios[id].assets} />
          </div>
          <div className="col-xs-4">
            <AssetViewList money={money} assets={assets} />
          </div>
          <div className="col-xs-4">
            <ChangePortfolio
              length={this.props.portfolios.length}
              selected={id}
              selectPortfolio={this.selectPortfolio.bind(this)}
            />
          </div>
        </div>
        <MoneyInvesting money={money} selected={id} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

export default Dashboard;
