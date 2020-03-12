import React from 'react'
import './Hero.css'

const Hero = props => {
    const background = `url(${props.info.image})
    no-repeat center center / cover`

    const bgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/1280px-MarvelLogo.svg.png'

    const backgroundFound = `url(${bgUrl}) no-repeat center center / contain`

    return props.info.wasFound || props.info.wasClicked ? backgroundOpened(background, props) : backgroundHide(backgroundFound, props)
}

const handleClickHero = (e, props) => {

    const clickedNode = e.target

    props.startStopwatch();

    props.startHeroActions(clickedNode)
}

const backgroundHide = (style, props) => (
    <React.Fragment>
        <li className="hero" onClick={e => handleClickHero(e, props)} key={props.info.code}>
            <div className="hero__clickable" rel={props.info.code} name={props.info.name}></div>
            <div className="hero__image" alt="" style={ { background: style } }>
            </div>
        </li>
    </React.Fragment>
)

const backgroundOpened = (style, props) => (
    <React.Fragment>
        <li className="hero" onClick={e => handleClickHero(e, props)} key={props.info.code}>
            <div className="hero__clickable" rel={props.info.code} name={props.info.name}></div>
            <div className="hero__image" alt="" style={ { background: style } }>
                <span className="hero__name">{props.info.name}</span>
            </div>
        </li>
    </React.Fragment>
)

export default Hero