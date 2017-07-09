import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/UpdateFormConstants';

import { showSuccess, showError } from '../utils/alerts';

import { increasePercentages, decreasePercentages,
  validateChangePercent } from '../validations/validations.js';

const AssetActions = {
  createAsset(asset, assets) {
    const length = assets.length;

    if (length == 0) {
      asset.id = length;
      asset.percentage = 100;
      assets.push(asset);
    } else {
      decreasePercentages(assets, asset.percentage);
      asset.id = length;
      assets.push(asset);
    }

    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_LIST,
      assets: assets
    });
  },

  deleteAsset(assetId, assets) {
  	const lostPercent = assets[assetId].percentage;
    assets.splice(assetId, 1);

    
    console.log('delete');
    if(assets.length == 0) {
      AppDispatcher.dispatch({
        type: Constants.CHANGE_ASSET_LIST,
        assets: []
      });
      return true;
    }

    assets.map((asset, i) => {
      if(i >= assetId) {
        asset.id -= 1;
      }
    });

    increasePercentages(assets, lostPercent);

    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_LIST,
      assets: assets
    });
  },

  selectPortfolio(portfolio) {
    AppDispatcher.dispatch({
      type: Constants.SELECT_PORTFOLIO,
      portfolio: portfolio
    });
  },

  changeAssetDescription(description, descType, assetId) {
  	AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_DESCRIPTION,
      asset: {description, descType, assetId}
    });
  },

  changePercentages(assetId, value, assets) {
  	if (assets.length == 1) {
  	  return true;
  	}

  	if (assets[assetId].percentage == value) {
  	  return true;
  	}

    assets[assetId].percentage = value;



    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_LIST,
      assets: assets
    });
  }
};

export default AssetActions;
