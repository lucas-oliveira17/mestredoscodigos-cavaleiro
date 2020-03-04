import React from 'react'

const RenderError = props => <div className="error"> <h1 className="error_message">{props.message.toString()}</h1> </div>

export default RenderError