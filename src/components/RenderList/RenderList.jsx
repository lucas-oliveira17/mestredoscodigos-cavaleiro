import React from 'react'
import Hero from '../Hero/Hero'

class RenderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heroes: []
        }
    }

    componentDidMount () {
        this.setState({ heroes: this.props.heroes })
    }

    shouldComponentUpdate(nextProps){
        if (this.props.clickedHeroes !== nextProps.clickedHeroes) {

            this.setHerosAsClicked(this.props.heroes, nextProps.clickedHeroes)

            this.setState({ heroes: this.props.heroes })

            return true
        }

        return true
    }

    setHerosAsClicked(heroesList, clickedHeroes) {
        heroesList.forEach(hero => clickedHeroes.includes(hero.code.toString()) ? hero.wasClicked = true : hero.wasClicked = false)
    }

    render = () => (<ul className={this.props.className}> {this.props.heroes.map(hero => 
        <Hero key={hero.code} startHeroActions={this.props.startHeroActions} compareNodes={this.props.compareNodes} 
            saveHeroClicked={this.props.saveHeroClicked} runStopwatch={this.props.runStopwatch} info={hero} />)}</ul>)
}

export default RenderList