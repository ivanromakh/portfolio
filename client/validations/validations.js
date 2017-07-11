
function indexOfMax(arr) {
  return arr.indexOf(Math.max(...arr));
}

function indexOfMin(arr) {
  return arr.indexOf(Math.min(...arr));
}

function validatePercSum(lostPercentages, assets) {
  let lostPerc = lostPercentages;
  if (lostPerc >= 1) {
    const restOfPercents = assets.map(asset =>
      asset.percentage - parseInt(asset.percentage, 10),
    );

    while (lostPerc > 0) {
      const max = indexOfMax(restOfPercents);
      assets[max].percentage += 1;
      restOfPercents[max] = 0;
      lostPerc -= 1;
    }
  } else if (lostPerc <= -1) {
    const restOfPercents = assets.map(asset =>
      asset.percentage - parseInt(asset.percentage, 10),
    );
    let count = 0;
    while (lostPerc < 0) {
      if (count > 10) break;
      count += 1;
      const min = indexOfMin(restOfPercents);
      if (assets[min].percentage === 1) {
        restOfPercents[min] = 1;
      } else {
        assets[min].percentage -= 1;
        if (assets[min].percentage >= 2) {
          restOfPercents[min] = 0.99;
        } else {
          restOfPercents[min] = 1;
        }
        lostPerc += 1;
      }
    }
  }
}

function multPercents(assets, multiplier) {
  assets.map((asset) => {
    asset.percentage *= multiplier / 100;
    // always bigger than 1
    asset.percentage = asset.percentage < 1 ? 1 : asset.percentage;
    return true;
  });
}

function getIntPercentages(assets) {
  return assets.reduce((total, asset) => ({
    percentage: parseInt(total.percentage, 10) + parseInt(asset.percentage, 10),
  }));
}

function parseIntPercentages(assets) {
  assets.map((asset) => {
    asset.percentage = parseInt(asset.percentage, 10);
    return true;
  });
}

function decreasePercentages(assets, lastPercent) {
  const restPercent = 100 - parseInt(lastPercent, 10);

  multPercents(assets, restPercent);

  if (assets.length <= 1) {
    assets[0].percentage = restPercent;
    return true;
  }

  const { percentage } = getIntPercentages(assets);

  const lostPercentages = restPercent - parseInt(percentage, 10);

  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);

  return assets;
}

function increasePercentages(assets, lostPercent) {
  const restPercent = 100 + parseInt(lostPercent, 10);

  multPercents(assets, restPercent);

  const { percentage } = getIntPercentages(assets);

  const lostPercentages = 100 - parseInt(percentage, 10);

  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);

  return assets;
}

function validateChangePercent(assets, value, asset) {
  let multiplayer = 100;
  const percentSum = 100 - value;

  multiplayer = 100 + (asset.percentage - value);
  multPercents(assets, multiplayer);

  const { percentage } = getIntPercentages(assets);

  const lostPercentages = percentSum - parseInt(percentage, 10);
  validatePercSum(lostPercentages, assets);
  parseIntPercentages(assets);

  return assets;
}

export { decreasePercentages, increasePercentages, validateChangePercent };
