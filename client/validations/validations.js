
function indexOfMax(arr) {
 return arr.indexOf(Math.max(...arr));
}

function indexOfMin(arr) {
 return arr.indexOf(Math.min(...arr));
}

function validatePercSum(lostPercentages, assets) {
  if(lostPercentages >= 1) {
    const restOfPercents = assets.map((asset) => {
      return asset.percentage - parseInt(asset.percentage);
    });

    while(lostPercentages > 0) {
      const max = indexOfMax(restOfPercents);
      assets[max].percentage += 1;
      restOfPercents[max] = 0;
      lostPercentages -= 1;
    }
  } else if(lostPercentages <= -1) {
    const restOfPercents = assets.map((asset) => {
      return asset.percentage - parseInt(asset.percentage);
    });
    var count = 0;
    while(lostPercentages < 0) {
      if(count> 10) break;
      count++;
      const min = indexOfMin(restOfPercents);
      if(assets[min].percentage == 1) {
        restOfPercents[min] = 1;
      } else {
        assets[min].percentage -= 1;
        if(assets[min].percentage >= 2) {
          restOfPercents[min] = 0.99;
        } else {
          restOfPercents[min] = 1;
        }
        lostPercentages += 1;
      }
    }
  }
}

function multPercents(assets, multiplier) {
  assets.map((asset) => {
    asset.percentage *= multiplier/100;
    // always bigger than 1
    asset.percentage = asset.percentage < 1 ? 1 : asset.percentage;
  });
}

function getIntPercentages(assets) {
  return assets.reduce((total, asset) => ({ 
    percentage: parseInt(total.percentage) + parseInt(asset.percentage)
  }));
}

function parseIntPercentages(assets) {
  assets.map((asset) => {
    asset.percentage = parseInt(asset.percentage);
  });
}

function decreasePercentages(assets, lastPercent) {
  const restPercent = 100 - parseInt(lastPercent);

  multPercents(assets, restPercent);

  if(assets.length <= 1) {
  	assets[0].percentage = restPercent;
  	return true;
  }

  const intPercentages = getIntPercentages(assets);

  let lostPercentages = restPercent - parseInt(intPercentages.percentage);

  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);
  
  return assets;
}

function increasePercentages(assets, lostPercent) {
  const restPercent = 100 + parseInt(lostPercent);

  multPercents(assets, restPercent);

  const intPercentages = getIntPercentages(assets);

  let lostPercentages = 100 - parseInt(intPercentages.percentage);

  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);

  return assets;
}

function validateChangePercent(assets, value, asset) {
  let multiplayer = 100;
  const percentSum = 100 - value;
  
  multiplayer = 100 + (asset.percentage - value);
  multPercents(assets, multiplayer);

  const intPercentages = getIntPercentages(assets);
  
  let lostPercentages = percentSum - parseInt(intPercentages.percentage);
  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);

  return assets;
}

export { decreasePercentages, increasePercentages,  validateChangePercent };