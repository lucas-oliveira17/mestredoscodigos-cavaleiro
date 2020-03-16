import React from 'react'

const Score = props => (
    <div className="score">
        <span className="score__content">Matches: {props.matches}</span>
    </div>
    )

export default Score