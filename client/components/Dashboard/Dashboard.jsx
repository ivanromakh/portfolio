import React from 'react';

import DoughnutChart from './DoughnutChart.jsx';
import AssetViewList from './AssetViewList.jsx';
import ChangePortfolio from './ChangePortfolio.jsx';

import { showInfo, showError } from '../../utils/alerts';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPortfolio: this.props.portfolios[0]
    };

    this.selectPortfolio = this.selectPortfolio.bind(this);
  }

  selectPortfolio(event) {
    let type = event.currentTarget.name;
    let { id } = this.state.selectedPortfolio;
    let { length } = this.props.portfolios

    if(type === "increment") {
      if (id <= length - 2) {
        id += 1;
      } else {
        showInfo('This is the last portfolio');
        return false;
      }
    } else if (type === "decrement") {
      if (id >= 1) {
        id -= 1;
      }  else {
        showInfo('This is the first portfolio');
        return false;
      }
    }

    this.setState({ selectedPortfolio: this.props.portfolios[id] });
  }

  render() {
    return (
      <div className='App'>
        <div className="row dashboard">
          <div className="col-xs-4">
            <DoughnutChart assets={this.state.selectedPortfolio.assets} />
          </div>
          <div className="col-xs-4">
            <AssetViewList assets={this.state.selectedPortfolio.assets} />
          </div>
          <div className="col-xs-4">
            <ChangePortfolio
              length={this.props.portfolios.length}
              selected={this.state.selectedPortfolio.id}
              selectPortfolio={this.selectPortfolio.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
