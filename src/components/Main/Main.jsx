import React from 'react'
import getHeroes from '../../services/hero'
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
        let ret = await getHeroes()
        
        return !hasError(ret) ? ret.duplicate().raffle() : ret;
    }

    render = () => !hasError(this.state.apiRet) ? <RenderContent heroes={this.state.apiRet} className={'heroes'} /> : <RenderError message={this.state.apiRet} />
}
export default Main