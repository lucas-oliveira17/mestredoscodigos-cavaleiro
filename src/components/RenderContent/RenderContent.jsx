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
            clickedHeroes: [],
            matches: 0,
            actualNode: document.createElement('div'),
            stopwatchStarted: false
        }
    }

    startHeroActions = clickedNode => {
        const heroName = clickedNode.getAttribute("name")
        const heroCode = clickedNode.getAttribute("rel")

        if (!clickedNode.isSameNode(this.state.actualNode) || this.state.actualNode.isSameNode(document.createElement('div'))) {
            this.setState({ clickedHeroes: [...this.state.clickedHeroes, heroCode] })
            this.compareHeros(heroName)
        }

        
        this.setState({ clickedHeroes: [...this.state.clickedHeroes, heroCode], heroToCompare: heroName, actualNode: clickedNode })
        this.clearHeroCompare()
    }

    compareHeros (heroName) { heroName === this.state.heroToCompare ? this.equalHeroActions(heroName) : this.differentHeroActions(heroName) }

    clearHeroCompare () {
        const isPair = this.state.compareQuantity % 2 === 0
        
        if (isPair) {
            this.setState({ heroToCompare: '' })

            const self = this;

            setTimeout(function(){ self.setState({ clickedHeroes: [] }) }, 1000);
        }

        this.setState({ compareQuantity: this.state.compareQuantity + 1 })
    }

    differentHeroActions () {
        this.setState({ comparingFeedback: false})
    }

    equalHeroActions (heroName) {
        const increaseMatches = this.state.matches + 1
        const addHeroToFoundHeroes = [...this.state.foundHeroes, heroName]
        this.setState({foundHeroes: addHeroToFoundHeroes, matches: increaseMatches })
    }

    startStopwatch () {
        this.setState({ stopwatchStarted: true })
    }

    stopStopwatch () {
        this.setState({ stopwatchStarted: false })
    }

    subtractFoundHeroes (array) {
        array.forEach(el => {
            this.state.foundHeroes.includes(el.name) ? el.wasFound = true : el.wasFound = false
            // this.state.clickedHeroes.includes(el.code.toString()) ? el.wasClicked = true : el.wasClicked = false
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
                    clickedHeroes={this.state.clickedHeroes} heroes={this.subtractFoundHeroes(this.props.heroes)} startStopwatch={this.startStopwatch.bind(this)}/>
            </div>
        )
    }
}

export default RenderContent