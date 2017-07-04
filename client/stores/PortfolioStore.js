import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _portfolio = {};
let _portfolios = [];
let _loadingError = null;
let _isLoading = true;


const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getPortfolios() {
    return _portfolios;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    case AppConstants.LOAD_PORTFOLIOS_REQUEST: {
      _isLoading = true;
      TasksStore.emitChange();
      break;
    }
    case AppConstants.LOAD_PORTFOLIOS_SUCCESS: {
      _isLoading = false;
      _portfolios = action.portfolios;
      _loadingError = null;
      TasksStore.emitChange();
      break;  
    }
    case AppConstants.LOAD_PORTFOLIOS_FAIL: {
      _loadingError = action.error;
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
