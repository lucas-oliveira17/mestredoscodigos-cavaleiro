import React from 'react'

const ModalHero = props => (
    <React.Fragment>
        <div className="content__top">
            <div className="top__left">
                <div className="top__image" style={ { background: `url(${props.hero.image}) no-repeat center center / contain` } } ></div>
            </div>
            <div className="top__right">
                <span className="top__name2">{props.hero.name}</span>
            </div>
        </div>
        <div className="content__bottom">
            <span className="bottom__description">{props.hero.description}</span>
        </div>
    </React.Fragment>
)

export default ModalHero