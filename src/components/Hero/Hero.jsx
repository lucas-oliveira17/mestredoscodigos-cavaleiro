import React from 'react'
import './Hero.css'

const Hero = props => {

    const handleClickHero = (e) => {
        props.startStopwatch();
        console.log(e.target.children[0].innerHTML)
    }

    return (
        <React.Fragment>
        <li className="hero" onClick={handleClickHero} key={props.info.id}>
            <div className="hero__image" alt="" style={ { background: `url(${props.info.thumbnail.path}.${props.info.thumbnail.extension})
                no-repeat center center / cover` } }>
                    <span className="hero__name" >{props.info.name}</span>
            </div>
        </li>
        </React.Fragment>
    )
}

export default Hero