import React from 'react'
import Hero from '../Hero/Hero'
import getHeroes from '../../services/hero'
import { hasError, raffleArray, duplicateArray } from '../../utils/utils'
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { heroes: [] }
    }

    componentDidMount () {
        const heroesQuantity = 16

        this.setHeroesToGame(heroesQuantity)
            .then(heroesRet => this.setState({ heroes: heroesRet }))
    }

    async setHeroesToGame (heroesQuantity) {
        const heroesReturned = await getHeroes(heroesQuantity)

        const duplicatedHeroesArray = duplicateArray(heroesReturned)

        const raffledHeroesArray = raffleArray(duplicatedHeroesArray)

        return raffledHeroesArray
    }

    render() {
        if (!hasError(this.state.heroes)) {
            return (
                <ul className="heroes" >{this.state.heroes.map(hero => 
                    <Hero info={hero} />)}
                </ul>
            )
        } else {
            return (
                <div className="error">
                    <h1 className="error_message">{this.state.heroes.toString()}</h1>
                </div>
            )
        }
    }
}

export default Main