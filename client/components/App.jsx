import React from 'react';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import PortfolioStore from '../stores/PortfolioStore';
import PortfolioActions from '../actions/PortfolioActions';

import ModalWindowDetail from './modalDetailPortfolio/ModalWindowDetail.jsx';
import ModalWindowUpdate from './modalUpdatePortfolio/ModalWindowUpdate.jsx';
import ModalWindowCreate from './modalCreatePortfolio/ModalWindowCreate.jsx';
import PortfolioTable from './PortfolioTable/PortfolioTable.jsx';

import './App.less';

function getStateFromFlux() {
  return {
    isLoading: PortfolioStore.isLoading(),
    portfolios: PortfolioStore.getPortfolios(),
    selectedPortfolio: {},
    showUpdateModal: false,
    showDetailModal: false,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getStateFromFlux();

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

  openModalUpdate(portfolio) {
    this.setState({ showUpdateModal: true, selectedPortfolio: portfolio });
  }

  closeModalUpdate() {
    this.setState({ showUpdateModal: false });
  }

  openModalDetail(portfolio) {
    this.setState({ showDetailModal: true, selectedPortfolio: portfolio });
  }

  closeModalDetail() {
    this.setState({ showDetailModal: false });
  }

  handlePortfolioCreate(portfolio) {
    PortfolioActions.createPortfolio(portfolio);
  }

  handlePortfolioDelete(portfolio) {
    PortfolioActions.deletePortfolio(portfolio.id);
  }

  render() {
    return (
      <div className='App'>
        <Alert stack={{ limit: 3 }} />
        <ModalWindowCreate handlePortfolioCreate={this.handlePortfolioCreate} />
        <ModalWindowUpdate
          handlePortfolioUpdate={this.handlePortfolioUpdate}
          closeModal = {this.closeModalUpdate.bind(this)}
          portfolio={this.state.selectedPortfolio}
          modalIsOpen={this.state.showUpdateModal}
        />
        <ModalWindowDetail
          closeModal = {this.closeModalDetail.bind(this)}
          portfolio={this.state.selectedPortfolio}
          modalIsOpen={this.state.showDetailModal}
        />
        <div>
          <h2 className='Table__header'>Portfolio list</h2>
          { !this.state.isLoading 
            ? <PortfolioTable 
              portfolios={ this.state.portfolios }
              openModalUpdate={ this.openModalUpdate.bind(this) }
              openModalDetail={ this.openModalDetail.bind(this) }
              handlePortfolioDelete={ this.handlePortfolioDelete }
            /> : null
          }
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }
}

export default App;
