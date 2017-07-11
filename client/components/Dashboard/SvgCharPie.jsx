import React from 'react';

function getAnglePoint(startAngle, endAngle, radius, x, y) {
  const x1 = x + (radius * Math.cos((Math.PI * startAngle) / 180));
  const y1 = y + (radius * Math.sin((Math.PI * startAngle) / 180));
  const x2 = x + (radius * Math.cos((Math.PI * endAngle) / 180));
  const y2 = y + (radius * Math.sin((Math.PI * endAngle) / 180));

  return { x1, y1, x2, y2 };
}

const Pie = React.createClass({
  render() {
    const colors = this.props.colors;
    const colorsLength = colors.length;
    const label = this.props.label;
    const hole = this.props.hole;
    const radius = this.props.radius;
    const diameter = radius * 2;
    const self = this;

    const sum = this.props.data.reduce((carry, current) => carry + current, 0);
    let startAngle = -90;


    return (
      <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
        { this.props.data.map((slice, sliceIndex) => {
          const nextAngle = startAngle;
          const angle = (slice / sum) * 360;
          const percent = (slice / sum) * 100;
          startAngle += angle;

          return (<Slice
            key={sliceIndex}
            value={slice}
            percent={self.props.percent}
            percentValue={percent.toFixed(1)}
            startAngle={nextAngle}
            angle={angle}
            radius={radius}
            hole={radius - hole}
            trueHole={hole}
            label={label}
            fill={colors[sliceIndex % colorsLength]}
            stroke={self.props.stroke}
            strokeWidth={self.props.strokeWidth}
          />);
        }) }

      </svg>
    );
  },
});

const Slice = React.createClass({
  getInitialState() {
    return {
      path: '',
      x: 0,
      y: 0,
    };
  },
  componentWillReceiveProps() {
    this.setState({ path: '' });
    this.animate();
  },
  componentDidMount() {
    this.animate();
  },
  animate() {
    this.draw(0);
  },
  draw(s) {
    if (!this.isMounted()) {
      return;
    }

    const p = this.props;
    const path = [];
    let c;
    const self = this;

    const step = p.angle / (37.5 / 2);

    if (s + step > p.angle) {
      s = p.angle;
    }

    const a = getAnglePoint(p.startAngle, p.startAngle + s, p.radius, p.radius, p.radius);
    const b = getAnglePoint(p.startAngle, p.startAngle + s, p.radius - p.hole, p.radius, p.radius);


    path.push(`M${a.x1},${a.y1}`);
    path.push(`A${p.radius},${p.radius} 0 ${(s > 180) ? 1 : 0},1 ${a.x2},${a.y2}`);
    path.push(`L${b.x2},${b.y2}`);
    path.push(`A${p.radius - p.hole},${p.radius - p.hole} 0 ${s > 180 ? 1 : 0},0 ${b.x1},${b.y1}`);

    path.push('Z');

    this.setState({ path: path.join(' ') });

    if (s < p.angle) {
      setTimeout(() => { self.draw(s + step); }, 16);
    } else if (p.showLabel) {
      c = getAnglePoint(
        p.startAngle,
        p.startAngle + (p.angle / 2),
        ((p.radius / 2) + (p.trueHole / 2)),
        p.radius,
        p.radius,
      );

      this.setState({
        x: c.x2,
        y: c.y2,
      });
    }
  },

  render() {
    return (
      <g overflow="hidden">
        <path
          d={this.state.path}
          fill={this.props.fill}
          stroke={this.props.stroke}
          strokeWidth={this.props.strokeWidth ? this.props.strokeWidth : 3}
        />
        <text x={this.props.radius} y={this.props.radius + 3} fill="#000" textAnchor="middle">
          {this.props.label}
        </text>
      </g>
    );
  },
});

export default Pie;
