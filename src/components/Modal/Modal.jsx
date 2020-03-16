import React from 'react'
import ModalHero from '../ModalHero/ModalHero'
import ModalWin from '../ModalWin/ModalWin'

const Modal = props => 
    (
        <div className="modal" onClick={props.closeModal}>
            <div className="modal__wrapper">
                <div className="modal__content">
                    {props.win === true ? <ModalWin /> : <ModalHero hero={props.hero} /> }
                </div>
            </div>
        </div>
    )

export default Modal