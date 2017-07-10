import React from 'react';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import PortfolioStore from '../stores/PortfolioStore';
import PortfolioActions from '../actions/PortfolioActions';

import NavBar from './NavBar.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
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
    view: 'portfolio',
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

  changeView(event) {
    console.log(event.currentTarget.name);
    this.setState({view: event.currentTarget.name});
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

  renderView() {
    if(this.state.view == 'portfolio') {
      return (
        <div>
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
          <h2 className='Table__header'>List of portfolios</h2>
          <div className="portfolios-container">
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
    } else if (this.state.view == 'dashboard') {
      return <Dashboard portfolios={this.state.portfolios} />;
    }
  }

  render() {
    return (
      <div className='App'>
        <NavBar changeView={this.changeView.bind(this)}/>
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
