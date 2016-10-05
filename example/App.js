import React from 'react'
import ReactDOM from 'react-dom';
import GaugeChart from '../bin/sh-gauge-chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 10
    };
    this.handleOneChange = this.handleOneChange.bind(this);
  }

  handleOneChange() {
    this.setState({
      value: _.random(50, 100)
    })
  }

  render() {
    let kill = 0;
    return (
      <div className="test-box">
        <button onClick={this.handleOneChange}>update value</button>
        <br/><br/>
        <div className="chart-container">
          <GaugeChart value={this.state.value} delay={kill}>{this.state.value}</GaugeChart>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));