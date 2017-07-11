import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import { showSuccess, showError } from '../utils/alerts';

import api from '../api';

const PortfolioActions = {
  loadPortfolios() {
    AppDispatcher.dispatch({
      type: Constants.LOAD_PORTFOLIOS_REQUEST,
    });

    api.listPortfolios()
      .then(({ data }) =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_PORTFOLIOS_SUCCESS,
          portfolios: data,
        }),
      )
      .catch((err) => {
        showError(err);
        AppDispatcher.dispatch({
          type: Constants.LOAD_PORTFOLIOS_FAIL,
          error: err,
        });
      });
  },

  changePortflioMoney(money, portfId) {
    AppDispatcher.dispatch({
      type: Constants.CHANGE_PORTFOLIO_MONEY,
      portfolio: { money, portfId }
    });
  },

  createPortfolio(portfolio) {
    portfolio.money = 0;
    console.log(portfolio);
    api.createPortfolio(portfolio)
      .then(() => {
        showSuccess('Portfolio created');
        this.loadPortfolios();
      })
      .catch(err =>
          showError(err),
      );
  },

  deletePortfolio(portfolioId) {
    api.deletePortfolio(portfolioId)
      .then(() =>
          this.loadPortfolios(),
      )
      .catch(err =>
          showError(err),
      );
  },
};

export default PortfolioActions;
