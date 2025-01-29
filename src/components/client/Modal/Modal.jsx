import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({isOpen, onClose, children}) => {
  const handleClose = (e) => {
    if(e.target.classList.contains('modal-overlay')) {
      onClose()
    }
  }
  return (
    <>
        {isOpen && (
            <div className="modal">
                <div className="modal-overlay" onClick={handleClose}>
                  <div className="modal-content">
                    <div className="modal-form">
                      <button className="modal-button input-border" onClick={() => onClose()}>Close</button>
                      {children}
                    </div>
                  </div>
                </div>
            </div>
        )}
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal