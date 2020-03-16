import React from 'react'
import RenderList from '../RenderList/RenderList'
import Stopwatch from '../Stopwatch/Stopwatch'
import Modal from '../Modal/Modal'
import LogoMarvel from '../LogoMarvel/LogoMarvel'
import Score from '../Score/Score'

class RenderContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            compareQuantity: 1,
            heroToCompare: '',
            comparingFeedback: '',
            foundHeroes: [],
            foundHero: {},
            clickedHeroes: [],
            matches: 0,
            actualNode: document.createElement('div'),
            stopwatchRunning: false,
            modal: false,
            win: false
        }
    }

    startHeroActions (clickedNode) {
        const heroName = clickedNode.getAttribute("name")
        const heroCode = clickedNode.getAttribute("rel")

        const hero = this.getHeroByName(heroName)

        if (hero.wasFound === false) {
            if (!clickedNode.isSameNode(this.state.actualNode) 
                || this.state.actualNode.isSameNode(document.createElement('div'))) {

                this.setState({ clickedHeroes: [...this.state.clickedHeroes, heroCode] })
                this.compareHeros(heroName)
            }
        }
        
        this.setState({ clickedHeroes: [...this.state.clickedHeroes, heroCode], heroToCompare: heroName, actualNode: clickedNode })
        this.clearHeroCompare()
    }

    clearHeroCompare () {
        const isPair = this.state.compareQuantity % 2 === 0
        
        if (isPair) {
            this.setState({ heroToCompare: '' })
            const self = this;
            setTimeout(() => { self.setState({ clickedHeroes: [] }) }, 1000);
        }
        this.setState({ compareQuantity: this.state.compareQuantity + 1 })
    }

    subtractFoundHeroes (array) {
        array.forEach(el => { this.state.foundHeroes.includes(el.name) ? el.wasFound = true : el.wasFound = false })
        return array;
    }

    equalHeroActions (heroName) {
        const increaseMatches = this.state.matches + 1
        const addHeroToFoundHeroes = [...this.state.foundHeroes, heroName]

        if (this.state.foundHeroes.length === 15) {
            this.setState({ win: true })
        }

        const heroObj = this.getHeroByName(heroName)
        this.setState({ foundHeroes: addHeroToFoundHeroes, matches: increaseMatches, modal: true, foundHero: heroObj })
    }

    differentHeroActions = () => { this.setState({ comparingFeedback: false}) }

    compareHeros = (heroName) => { heroName === this.state.heroToCompare ? this.equalHeroActions(heroName) : this.differentHeroActions(heroName) }

    getHeroByName = (heroName) => this.props.heroes.find(hero => hero.name === heroName)

    runStopwatch = (bool) => { this.setState({ stopwatchRunning: bool }) }

    closeModal = () => { this.setState({ modal: false }) }

    render() {
        return (
            <div className="wrapper">
                { this.state.modal === false ? <div></div> : <Modal win={this.state.win} hero={this.state.foundHero} modal={this.state.modal} closeModal={this.closeModal.bind(this)}/> }
                <div className="top">
                    <Stopwatch stopwatchRunning={this.state.stopwatchRunning}/>
                    <LogoMarvel />
                    <Score matches={this.state.matches} />
                </div>
                <RenderList className={this.props.className} startHeroActions={this.startHeroActions.bind(this)}
                    clickedHeroes={this.state.clickedHeroes} heroes={this.subtractFoundHeroes(this.props.heroes)} runStopwatch={this.runStopwatch.bind(this)}/>
            </div>
        )
    }
}

export default RenderContent