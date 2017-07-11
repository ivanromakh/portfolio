import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

/* eslint no-underscore-dangle: [2, { "allow": ["_portfolios", "_isLoading"] }]*/
let _portfolios = [];
let _isLoading = true;


const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getPortfolios() {
    return _portfolios;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

AppDispatcher.register((action) => {
  switch (action.type) {
    case AppConstants.CHANGE_PORTFOLIO_MONEY: {
      const { portfId, money } = action.portfolio
      _portfolios.map((portfolio) => {
        if(portfolio.id === portfId) {
          portfolio.money = money;
        }
      });
      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_PORTFOLIOS_REQUEST: {
      _isLoading = true;
      TasksStore.emitChange();
      break;
    }
    case AppConstants.LOAD_PORTFOLIOS_SUCCESS: {
      _isLoading = false;
      _portfolios = action.portfolios;
      TasksStore.emitChange();
      break;
    }
    case AppConstants.LOAD_PORTFOLIOS_FAIL: {
      TasksStore.emitChange();
      break;
    }
    default: {
      return true;
    }
  }
  return true;
});

export default TasksStore;
