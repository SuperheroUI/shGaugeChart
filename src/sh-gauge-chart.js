import React from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';

require('./sh-gauge-chart.scss');

class GaugeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: props.delay,
      size: 100,
      g: null,
      chunk: 1,
      reverse: false,
    };
  }

  componentDidMount() {
    let chunk = 360 / this.props.barCount;
    let box = this.refs.svg.getBoundingClientRect();
    let size = _.min([box.height, box.width]);
    let svg = d3.select(this.refs.svg);
    let g = svg.append('g');

    this.setState({
      size: size
    }, function () {
      g.attr('transform', 'translate(' + this.state.size / 2 + ',' + this.state.size / 2 + ') rotate(180)');
    });

    let barData = _.map(_.range(this.props.barCount), () => {
      return this.props.barHeight;
    });

    g.selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (size / 2) - this.props.barHeight)
      .attr('width', this.props.barWidth)
      .attr('height', (d) => {
        return d;
      })
      .attr('transform', (d, i) => {
        return 'rotate(' + (i * chunk) + ')';
      })
    ;

    this.setState({
      g: g,
      chunk: chunk
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      reverse: props.value < this.props.value
    });
  }

  componentDidUpdate() {
    this.state.g.selectAll('rect')
      .transition()
      .delay((d, i) => {
        let chunk = this.state.reverse ? 360 - (i * this.state.chunk) : i * this.state.chunk;
        return 2 * chunk * this.state.delay;
      })
      .attr('class', (d, i) => {
        return (i * this.state.chunk > 360 * (this.props.value / this.props.max)) ? 'empty' : 'fill';
      })
    ;
  }

  //noinspection JSMethodCanBeStatic
  render() {
    return (
      <div className="sh-gauge-chart">
        <svg ref="svg"/>
        <div className="sh-gauge-content">{this.props.children}</div>
      </div>
    );
  }
}

GaugeChart.propTypes = {

  value: React.PropTypes.number.isRequired,
  max: React.PropTypes.number,
  barHeight: React.PropTypes.number,
  barWidth: React.PropTypes.number,
  barCount: React.PropTypes.number,
  delay: React.PropTypes.number,
};

GaugeChart.defaultProps = {
  max: 100,
  barHeight: 10,
  barWidth: 1,
  barCount: 60,
  delay: 1
};

export default GaugeChart
