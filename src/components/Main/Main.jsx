import React from 'react'
import heroService from '../../services/hero'
import Hero from '../../model/Hero'
import RenderContent  from '../RenderContent/RenderContent'
import RenderError from '../RenderError/RenderError'
import { hasError } from '../../utils/utils'
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = { apiRet: [] }
    }

    componentDidMount () {
        this.setHeroesToGame().then(ret => 
            this.setState({ apiRet: ret }))
    }

    async setHeroesToGame () {
        let ret = await heroService()
        return !hasError(ret) ? ret.map(hero => new Hero(hero.name, hero.id, `${hero.thumbnail.path}.${hero.thumbnail.extension}`)).duplicate().raffle() : ret;
    }

    render = () => !hasError(this.state.apiRet) ? <RenderContent heroes={this.state.apiRet} className={'heroes'} /> : <RenderError message={this.state.apiRet} />
}

export default Main