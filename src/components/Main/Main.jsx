import React from 'react'
import heroService from '../../services/hero'
import Hero from '../../model/Hero'
import RenderContent  from '../RenderContent/RenderContent'
import RenderError from '../RenderError/RenderError'
import { hasError, raffle } from '../../utils/utils'
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { apiRet: [] }
    }

    componentDidMount () {
        this.setHeroesToGame().then(ret => {
            this.setState({ apiRet: ret })
        })
    }

    duplicateHeroesList(heroesList) {
        let newArray = []
    
        heroesList.forEach(el => newArray.push(new Hero(el.name, el.code + 1000, el.image, el.description)))
    
        return [...heroesList, ...newArray]
    }

    async setHeroesToGame () {
        let ret = await heroService()

        const heroesList = ret.map(hero => new Hero(hero.name, hero.id, `${hero.thumbnail.path}.${hero.thumbnail.extension}`, hero.description))
        
        const heroesListDuplicated = this.duplicateHeroesList(heroesList);
        
        const heroesListRaffled = raffle(heroesListDuplicated);

        return !hasError(ret) ? heroesListRaffled : ret;
    }

    render = () => !hasError(this.state.apiRet) ? <RenderContent heroes={this.state.apiRet} className={'heroes'} /> : <RenderError message={this.state.apiRet} />
}

export default Main