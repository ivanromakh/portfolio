import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import UpdateConstants from '../constants/UpdateFormConstants';

const CHANGE_EVENT = 'change';

let _portfolio = {};
let _loadingError = null;


const TasksStore = Object.assign({}, EventEmitter.prototype, {
  getPortfolio() {
    console.log("load");
    return _portfolio;
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
    case UpdateConstants.CHANGE_ASSET_DESCRIPTION: {
      const {assetId, description, descType} = action.asset;
      _portfolio.assets.map((asset) => {
        if(asset.id == assetId) {
          asset[descType] = description;
        }
      });
      console.log("change-description");
      TasksStore.emitChange();
      break;
    }
    case UpdateConstants.CHANGE_ASSET_LIST: {
      _portfolio.assets = action.assets;
      console.log("change-assets:", _portfolio.assets);
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
