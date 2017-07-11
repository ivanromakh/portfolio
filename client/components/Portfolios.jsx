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


/* eslint no-underscore-dangle: [2, { "allow": ["_onChange"] }]*/
class Portfolios extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUpdateModal: false,
      showDetailModal: false,
      selectedPortfolio: {},
    };
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
      <div>
          <ModalWindowCreate handlePortfolioCreate={this.handlePortfolioCreate} />
          <ModalWindowUpdate
            handlePortfolioUpdate={this.handlePortfolioUpdate}
            closeModal={this.closeModalUpdate.bind(this)}
            portfolio={this.state.selectedPortfolio}
            modalIsOpen={this.state.showUpdateModal}
          />
          <ModalWindowDetail
            closeModal={this.closeModalDetail.bind(this)}
            portfolio={this.state.selectedPortfolio}
            modalIsOpen={this.state.showDetailModal}
          />
          <h2 className="Table__header">List of portfolios</h2>
          <div className="portfolios-container">
            { !this.state.isLoading
              ? <PortfolioTable
                portfolios={this.props.portfolios}
                openModalUpdate={this.openModalUpdate.bind(this)}
                openModalDetail={this.openModalDetail.bind(this)}
                handlePortfolioDelete={this.handlePortfolioDelete}
              /> : null
            }
          </div>
        </div>
    );
  }
}

export default Portfolios;
