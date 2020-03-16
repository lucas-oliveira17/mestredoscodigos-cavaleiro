import React from 'react'
import { isEmpty } from '../../utils/utils'

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: 0,
            minutes: 0, 
            seconds: 0,
            interval: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.stopwatchRunning !== nextProps.stopwatchRunning) {
            return true
        }

        return nextState !== this.state;
    }

    componentDidUpdate() {
        if (isEmpty(this.state.interval)) {
            this.setState({ interval: setInterval(this.updateTimer.bind(this), 1000) })
        }
    }

    updateTimer () {
        let actualSecond = this.state.seconds;
        let actualMinute = this.state.minutes;
        let actualHour = this.state.hours;

        this.setState({ seconds: actualSecond + 1})

        if (actualSecond === 59) {
            this.setState({ seconds: 0 })
            this.setState({ minutes: actualMinute + 1})
        }

        if (actualMinute === 59) {
            this.setState({ seconds: 0 })
            this.setState({ minutes: 0 })
            this.setState({ hours: actualHour + 1})
        }

        //Exemplo de condição de parada
        if (actualHour === 2) {
            clearInterval(this.props.interval)
            this.setState({ seconds: 0 })
        }
    }

    render() {
        return (
            <div className="stopwatch">
                <div className="hour">
                    <span className="hours">{this.state.hours >= 10 ? this.state.hours : `0${this.state.hours}`}</span>
                    :<span className="minutes">{this.state.minutes >= 10 ? this.state.minutes : `0${this.state.minutes}`}</span>
                    :<span className="seconds">{this.state.seconds >= 10 ? this.state.seconds : `0${this.state.seconds}`}</span>
                </div>
            </div>
        )
    }
}

export default Stopwatch