import React from 'react'
import getHeros from '../../services/hero'
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heros: []
        }
    }

    componentDidMount() {
        this.getHeros()
    }

    async getHeros() {
        const herosReturned = await getHeros();
        this.setState({ heros: herosReturned })
    }

    render() {
        return (<ul>{this.state.heros.map(hero => <li key={hero.id}>{hero.name}</li>)}</ul>)
    }
}

export default Main