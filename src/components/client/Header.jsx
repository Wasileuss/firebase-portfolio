import PropTypes from "prop-types"
// import { Logo } from "../ui/Logo.jsx"

function Header({ isMenuOpen, handleMenuClick }) {
    return(
        <header className='header'>
            <div className="header__container">
                {/* <div className='header__logo'>
                    <Logo alt="logo" />
                </div> */}
                <div className="">
                    <h1 className="">Frontend Developer</h1>
                    <h2 className="">Bringing Ideas to Life Through Code</h2>
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
