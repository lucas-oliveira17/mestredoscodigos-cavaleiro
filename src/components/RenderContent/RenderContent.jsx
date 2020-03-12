import React from 'react'
import RenderList from '../RenderList/RenderList'
import Stopwatch from '../Stopwatch/Stopwatch'

class RenderContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            compareQuantity: 1, 
            heroToCompare: '',
            comparingFeedback: '',
            foundHeroes: [],
            clickedHero: 0,
            matches: 0,
            actualNode: document.createElement('div'),
            stopwatchStarted: false
        }
    }

    startStopwatch () {
        this.setState({ stopwatchStarted: true })
    }

    stopStopwatch () {
        this.setState({ stopwatchStarted: false })
    }

    startHeroActions = clickedNode => {
        const heroName = clickedNode.getAttribute("name")
        const heroCode = clickedNode.getAttribute("rel")

        console.log(heroCode)

        if (!clickedNode.isSameNode(this.state.actualNode) || this.state.actualNode.isSameNode(document.createElement('div'))) {
            this.compareHeros(heroName)
        }

        this.setState({ clickedHero: heroCode, heroToCompare: heroName, actualNode: clickedNode })
        this.clearHeroCompare()
    }

    compareHeros (heroName) {
        if (heroName === this.state.heroToCompare) {
            this.equalHeroActions(heroName)
        } else {
            this.differentHeroActions(heroName)
        }
    }

    differentHeroActions () {
        this.setState({ comparingFeedback: 'Herois diferentes!'})
    }

    equalHeroActions (heroName) {
        const increaseMatches = this.state.matches + 1
        const addHeroToFoundHeroes = [...this.state.foundHeroes, heroName]
        this.setState({ comparingFeedback: 'Herois Iguais!', foundHeroes: addHeroToFoundHeroes, matches: increaseMatches })
    }

    clearHeroCompare () {
        const isOdd = this.state.compareQuantity % 2 === 0
        
        if (isOdd) {
            this.setState({ heroToCompare: '' })
        }

        this.setState({ compareQuantity: this.state.compareQuantity + 1})
    }

    subtractFoundHeroes (array) {
        array.forEach(el => {
            this.state.foundHeroes.includes(el.name) ? el.wasFound = true : el.wasFound = false
            el.code.toString() === this.state.clickedHero.toString() ? el.wasClicked = true : el.wasClicked = false
        })
        return array;
    }

    render() {
        return (
            <div>
                <div className="top">
                    <Stopwatch stopwatchStarted={this.state.stopwatchStarted}/>
                    <div className="logo">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1280px-MarvelLogo.svg.png" alt="" className="logo__content"/>
                    </div>
                    <div className="score">
                    <span className="score__content">Matches: {this.state.matches}</span>
                    </div>
                </div>
                <RenderList className={this.props.className} startHeroActions={this.startHeroActions.bind(this)}
                    heroes={this.subtractFoundHeroes(this.props.heroes)} startStopwatch={this.startStopwatch.bind(this)}/>
            </div>
        )
    }
}

export default RenderContent