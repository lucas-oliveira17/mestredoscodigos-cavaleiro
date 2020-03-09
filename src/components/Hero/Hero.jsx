import React from 'react'
import './Hero.css'

const Hero = props => {

    const background = `url(${props.info.thumbnail.path}.${props.info.thumbnail.extension})
    no-repeat center center / cover`

    const backgroundFound = `red`

    const handleClickHero = (e) => {
        const heroClickedName = e.target.getAttribute("name")
        const clickedNode = e.target
        const didNotClickedSameElement = !props.compareNodes(clickedNode);

        //props.startStopwatch();

        if (didNotClickedSameElement) {
            props.saveHeroClicked(heroClickedName)
        }
    }
        return (
            <React.Fragment>
                <li className="hero" onClick={handleClickHero} key={props.info.id}>
                    <div className="hero__clickable" rel={props.info.id} name={props.info.name}></div>
                    <div className="hero__image" alt="" style={ props.info.wasFound ? { background: backgroundFound } : { background: background } }>
                            <span className="hero__name" >{props.info.name}</span>
                    </div>
                </li>
            </React.Fragment>
        )
}

export default Hero