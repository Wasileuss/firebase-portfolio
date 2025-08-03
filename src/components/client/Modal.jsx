import PropTypes from 'prop-types'
import Button from '../ui/Button.jsx'

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
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
                <Button
                  className="modal-button input-border"
                  variant="delete"
                  onClick={() => onClose()}
                >
                  Close
                </Button>
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
  onClose: PropTypes.func.isRequired,
}

export default Modal
