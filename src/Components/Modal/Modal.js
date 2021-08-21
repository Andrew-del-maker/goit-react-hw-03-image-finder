import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import './modal.scss'

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = e => {
         if (e.code === 'Escape') {
                this.props.onClose();
         }
    }
    onOverlayClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }
    render() {
        return createPortal (
            <div className="Overlay" onClick={this.onOverlayClick}>
             <div className="Modal">
                {this.props.children}
             </div>
            </div>, modalRoot

        )
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
}
export default Modal;