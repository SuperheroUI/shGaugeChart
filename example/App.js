import React from 'react'
import ReactDOM from 'react-dom';
import GaugeChart from '../bin/sh-gauge-chart';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleOneChange = this.handleOneChange.bind(this);
    }

    handleOneChange(event) {
    }

    render() {
        return <div>
            <GaugeChart>
            </GaugeChart>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));