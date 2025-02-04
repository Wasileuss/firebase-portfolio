import PropTypes from "prop-types"
import { Logo } from "../ui/Logo.jsx"

function Header({ isMenuOpen, handleMenuClick }) {
    return(
        <header className='header'>
            <div className="header__container">
                <div className='header__logo'>
                    <Logo alt="logo" />
                </div>
                <button
                  type="button"
                  className={`icon-menu ${isMenuOpen ? 'menu-open' : ''}`}
                  onClick={handleMenuClick}
                  aria-label="Menu button"
                >
                    <span></span>
                </button>
            </div>
        </header>
    )
}

Header.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    handleMenuClick: PropTypes.func.isRequired
}

export default Header
