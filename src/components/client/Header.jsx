import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function Header({ isMenuOpen, handleMenuClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <h1 className="header__title">Frontend Developer</h1>
          <h2 className="header__subtitle">Bringing Ideas to Life Through Code</h2>
          {/*<h1 className="header__title">&lt;Frontend Developer /&gt;</h1>*/}
          {/*<h2 className="header__subtitle">&#123;&#91; Bringing Ideas to Life Through Code &#93;&#125;</h2>*/}
        </NavLink>
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
  handleMenuClick: PropTypes.func.isRequired,
}

export default Header
