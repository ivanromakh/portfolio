import React from 'react';
import PropTypes from 'prop-types';

import { Doughnut } from 'react-chartjs-2';


class DoughnutChart extends React.Component {
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const { assets } = this.props;

    let data = {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
      hoverBackgroundColor: [],
    };

    if (assets.length == 0) {
      data = {
        labels: ['No assets'],
        datasets: [{
          data: [1],
          backgroundColor: ['grey'],

        }],
      };
    } else {
      assets.map((asset) => {
        const color = this.getRandomColor();

        data.labels.push(asset.shortDescription);
        data.datasets[0].data.push(asset.percentage);
        data.datasets[0].backgroundColor.push(color);
        data.hoverBackgroundColor.push(color);
      });
    }

    return (
      <div className="PieChart">
        <Doughnut data={data} height={300} width={300} />
      </div>
    );
  }
}

DoughnutChart.propTypes = {
  assets: PropTypes.array.isRequired,
};

export default DoughnutChart;
