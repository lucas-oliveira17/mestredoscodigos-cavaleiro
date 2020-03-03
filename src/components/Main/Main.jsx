import React from 'react'
import getHeroes from '../../services/hero'
import { hasError } from '../../utils/error'
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { heroes: [] }
    }

    componentDidMount() {
        const heroesQuantity = 16;

        this.getHeroes(heroesQuantity)
    }

    async getHeroes(heroesQuantity) {
        const heroesReturned = await getHeroes(heroesQuantity);

        this.setState({ heroes: heroesReturned.concat(heroesReturned).sort(() => Math.random() - 0.5) })
    }

    render() {
        if (!hasError(this.state.heroes)) {
            return (
                <ul className="heroes" >{this.state.heroes.map(hero => 
                    <li className="hero" key={hero.id}>
                        <div className="hero__image" alt="" style={ { background: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})
                            no-repeat center center / cover` } }>
                            <span className="hero__name" >{hero.name}</span>
                        </div>
                    </li>)}
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