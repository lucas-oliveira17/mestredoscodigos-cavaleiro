import React from 'react'
import { convertToSeconds } from '../../utils/utils'
import RenderList from '../RenderList/RenderList'

class RenderContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hours: 0,
            minutes: 0, 
            seconds: 0, 
            interval: {}, 
            score: 0, 
            heroClicked: '', 
            heroesToCompare: [], 
            comparingFeedback: '',
            foundHeroes: [],
            matches: 0,
            actualNode: document.createElement('div')
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
            clearInterval(this.state.interval);
            this.setState({ seconds: 0 })
        }
        this.setState({ score: convertToSeconds(actualHour, actualMinute, actualSecond) })
    }

    startStopwatch () {
        this.setState({ interval: setInterval(this.updateTimer.bind(this), 10) })
    }

    saveHeroClicked (heroClickedName) {
        if (this.state.heroesToCompare.length <= 1) {
            this.setState({ heroesToCompare: [...this.state.heroesToCompare, heroClickedName] }, () => { this.doCompareActions() })
        }
    }

    compareNodes (clickedNode) {
        if (clickedNode.isSameNode(this.state.actualNode)) {
            this.setState({ heroesToCompare: [] })
            return true;
        }
        
        this.setState({ actualNode: clickedNode })
        return false;
    }

    doCompareActions () {
        if (this.state.heroesToCompare.length === 2) {
            this.state.heroesToCompare[0] === this.state.heroesToCompare[1] ?
                this.setState({ comparingFeedback: 'Herois Iguais!', 
                                foundHeroes: [...this.state.foundHeroes, this.state.heroesToCompare[1]], 
                                matches: this.state.matches + 1 })
            :
                this.setState({ comparingFeedback: 'Herois diferentes!'})
            
            this.setState({ heroesToCompare: [] })
        }
    }

    subtractFoundHeroes (array) {
        array.forEach(el => {
            console.log(this.state.foundHeroes.includes(el.name))
        })
        
        array.forEach(el => !this.state.foundHeroes.includes(el.name) ? el.wasFound = true : el.wasFound = false)
        return array;
    }

    render() {

        return (
            <div>
                <div className="top">
                    <div className="stopwatch">
                    <div className="hour">
                        <span className="hours">{this.state.hours >= 10 ? this.state.hours : `0${this.state.hours}`}</span>
                        :<span className="minutes">{this.state.minutes >= 10 ? this.state.minutes : `0${this.state.minutes}`}</span>
                        :<span className="seconds">{this.state.seconds >= 10 ? this.state.seconds : `0${this.state.seconds}`}</span>
                    </div>
                    </div>
                    <div className="logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1280px-MarvelLogo.svg.png" alt="" className="logo__content"/>
                    </div>
                    <div className="score">
                    <span className="score__content">Score: {this.state.matches}</span>
                    </div>
                </div>
                <RenderList className={this.props.className} compareNodes={this.compareNodes.bind(this)} 
                    saveHeroClicked={this.saveHeroClicked.bind(this)} startStopwatch={this.startStopwatch.bind(this)} 
                        heroes={this.subtractFoundHeroes(this.props.heroes)}/>
            </div>
        )
    }
}

export default RenderContent