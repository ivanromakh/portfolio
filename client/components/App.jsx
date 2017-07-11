import React from 'react';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import PortfolioStore from '../stores/PortfolioStore';
import PortfolioActions from '../actions/PortfolioActions';

import NavBar from './NavBar.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import ModalWindowDetail from './modalDetailPortfolio/ModalWindowDetail.jsx';
import ModalWindowUpdate from './modalUpdatePortfolio/ModalWindowUpdate.jsx';
import ModalWindowCreate from './modalCreatePortfolio/ModalWindowCreate.jsx';
import PortfolioTable from './PortfolioTable/PortfolioTable.jsx';
import Portfolios from './Portfolios.jsx';

import './App.less';


function getStateFromFlux() {
  return {
    isLoading: PortfolioStore.isLoading(),
    portfolios: PortfolioStore.getPortfolios(),
  };
}

/* eslint no-underscore-dangle: [2, { "allow": ["_onChange"] }]*/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: PortfolioStore.isLoading(),
      portfolios: PortfolioStore.getPortfolios(),
      showUpdateModal: false,
      showDetailModal: false,
      view: 'portfolio',
      selectedPortfolio: {},
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PortfolioActions.loadPortfolios();
  }

  componentDidMount() {
    PortfolioStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PortfolioStore.removeChangeListener(this._onChange);
  }

  changeView(event) {
    this.setState({ view: event.currentTarget.name });
  }

  renderView() {
    if (this.state.view === 'portfolio') {
      return (
        <Portfolios portfolios={this.state.portfolios} />
      );
    } else if (this.state.view === 'dashboard') {
      return <Dashboard portfolios={this.state.portfolios} />;
    }
    return null;
  }

  render() {
    return (
      <div className="App">
        <NavBar changeView={this.changeView.bind(this)} />
        <Alert stack={{ limit: 3 }} />
        {this.renderView()}

      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }
}

export default App;
