import React from 'react'
import Hero from '../Hero/Hero'

const RenderList = props => <ul className={props.className}> {props.heroes.map(hero => 
    <Hero key={hero.code} startHeroActions={props.startHeroActions} compareNodes={props.compareNodes} 
        saveHeroClicked={props.saveHeroClicked} startStopwatch={props.startStopwatch} info={hero} />)} </ul>

export default RenderList