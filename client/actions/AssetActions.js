import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/UpdateFormConstants';

import { showError } from '../utils/alerts';

import api from '../api';

import { increasePercentages,
  decreasePercentages } from '../validations/validations.js';


const AssetActions = {
  createAsset(asset, assets) {
    const length = assets.length;

    if (length === 0) {
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
      assets,
    });
  },

  deleteAsset(assetId, assets) {
    const lostPercent = assets[assetId].percentage;
    assets.splice(assetId, 1);

    if (assets.length === 0) {
      AppDispatcher.dispatch({
        type: Constants.CHANGE_ASSET_LIST,
        assets: [],
      });
      return true;
    }

    assets.map((asset, i) => {
      if (i >= assetId) {
        asset.id -= 1;
      }
      return false;
    });

    increasePercentages(assets, lostPercent);

    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_LIST,
      assets,
    });
    return true;
  },

  selectPortfolio(portfolio) {
    AppDispatcher.dispatch({
      type: Constants.SELECT_PORTFOLIO,
      portfolio,
    });
  },

  updatePortfolio(portfolio) {
    api.updatePortfolio(portfolio)
    .then(() => true)
    .catch((err) => {
      showError(err);
      return false;
    });
  },

  changeAssetDescription(description, descType, assetId) {
    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_DESCRIPTION,
      asset: { description, descType, assetId },
    });
  },

  changePorfolioDescription(description, descType, assetId) {
    AppDispatcher.dispatch({
      type: Constants.CHANGE_PORFOLIO_DESCRIPTION,
      description: { description, descType, assetId },
    });
  },

  changePercentages(assetId, value, assets) {
    const val = Number(value);

    if (assets.length === 1) {
      return true;
    }

    if (assets[assetId].percentage === val) {
      return true;
    }

    assets[assetId].percentage = val;

    AppDispatcher.dispatch({
      type: Constants.CHANGE_ASSET_LIST,
      assets,
    });
    return true;
  },
};

export default AssetActions;
