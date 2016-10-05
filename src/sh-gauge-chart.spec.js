var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react/lib/ReactTestUtils');
var _ = require('lodash');
import * as d3 from 'd3';

var ShGaugeChart = require('./sh-gauge-chart').default;

describe('ShGaugeChart', function () {
  it('can be rendered and uses correct classes ', function () {
    let value = 50;
    let root = TestUtils.renderIntoDocument(<div style={{height: 50, width: 50}}><ShGaugeChart
      value={value}>{value}</ShGaugeChart></div>);
    let rootNode = ReactDOM.findDOMNode(root);
    d3.timerFlush();
    expect(root).not.toBeNull();
    expect(rootNode.innerHTML).toContain(5);
    expect(rootNode.getElementsByClassName('fill').length).toBe(1);
    ReactDOM.unmountComponentAtNode(rootNode.parentNode);
  });

  it('should update automatically if value changes ', function () {
    let value = 50;
    let root = TestUtils.renderIntoDocument(<ShGaugeChart value={value}>{value}</ShGaugeChart>);
    let rootNode = ReactDOM.findDOMNode(root);
    d3.timerFlush();
    let props = {value: 20};
    root.componentWillReceiveProps(props);
    d3.timerFlush();
    expect(root.state.reverse).toBe(true);
    ReactDOM.unmountComponentAtNode(rootNode.parentNode);
  });

  it('check to see if it creates the correct amount of rectangles', function () {
    let value = 50;
    let delay = 0;
    let root = TestUtils.renderIntoDocument(<ShGaugeChart value={value} delay={delay}>{value}</ShGaugeChart>);
    let rootNode = ReactDOM.findDOMNode(root);
    d3.timerFlush();

    expect(rootNode.getElementsByClassName('fill').length).toBe(31);

    expect(root.state.chunk).toBe(6);
    expect(root.state.reverse).toBe(false);
    expect(root.state.size).toBe(0);
    expect(root.state.g).toBeDefined();
    ReactDOM.unmountComponentAtNode(rootNode.parentNode);
  });
});
