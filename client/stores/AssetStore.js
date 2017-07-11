import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UpdateConstants from '../constants/UpdateFormConstants';

const CHANGE_EVENT = 'change';


/* eslint no-underscore-dangle: [2, { "allow": ["_portfolio"] }]*/
let _portfolio = {};

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  getPortfolio() {
    return _portfolio;
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
    case UpdateConstants.CHANGE_PORFOLIO_DESCRIPTION: {
      const { description, descType } = action.description;
      _portfolio[descType] = description;
      TasksStore.emitChange();
      break;
    }
    case UpdateConstants.CHANGE_ASSET_DESCRIPTION: {
      const { assetId, description, descType } = action.asset;
      _portfolio.assets.map((asset) => {
        if (asset.id === assetId) {
          asset[descType] = description;
          return true;
        }
        return false;
      });
      TasksStore.emitChange();
      break;
    }
    case UpdateConstants.CHANGE_ASSET_LIST: {
      _portfolio.assets = action.assets;
      TasksStore.emitChange();
      break;
    }
    case UpdateConstants.SELECT_PORTFOLIO: {
      _portfolio = action.portfolio;
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
