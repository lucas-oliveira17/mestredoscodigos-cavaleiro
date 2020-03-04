import React from 'react'
import { convertToSeconds } from '../../utils/utils'
import RenderList from '../RenderList/RenderList'

class RenderContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hours: 0, minutes: 0, seconds: 0, interval: {}, score: 0
        }
    }

    componentDidMount () {
        const updateTimer = () => {
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

            if (actualHour === 2) {
                clearInterval(this.state.interval);
                this.setState({ seconds: 0 })
            }
            this.setState({ score: convertToSeconds(actualHour, actualMinute, actualSecond) })
        }
        this.setState({ interval: setInterval(updateTimer, 10) })
    }

    render() {
        return (
            <div>
                <div className="stopwatch">
                <span className="hours">{this.state.hours >= 10 ? this.state.hours : `0${this.state.hours}`}</span>
                :<span className="minutes">{this.state.minutes >= 10 ? this.state.minutes : `0${this.state.minutes}`}</span>
                :<span className="seconds">{this.state.seconds >= 10 ? this.state.seconds : `0${this.state.seconds}`}</span>
                </div>
                <div className="score">
                <span className="score__content">{this.state.score}</span>
                </div>
                <RenderList className={this.props.className} heroes={this.props.heroes}/>
            </div>
        )
    }
}

export default RenderContent