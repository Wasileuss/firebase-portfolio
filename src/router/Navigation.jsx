import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from './navigation.js'
import 'animate.css'
import PropTypes from 'prop-types'
import { useAuth } from '../components/admin/Auth.jsx'
import { doSignOut } from '../firebaseAuth.js'
import Button from '../components/ui/Button.jsx'

const Navigation = ({ isMenuOpen, closeMenu }) => {
  const { userLoggedIn } = useAuth()
  const [shouldAnimate, setShouldAnimate] = useState(true)

  const handleNavLinkClick = () => {
    closeMenu()
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767.98) {
        setShouldAnimate(false)
      } else {
        setShouldAnimate(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={`nav ${isMenuOpen ? 'active' : ''}`}>
      <ul className="nav__list">
        {navigation.map((el) => (
          <li
            key={Math.random() * 100}
            className={`nav__item ${
              shouldAnimate ? 'animate__animated animate__fadeInRight' : ''
            }`}
          >
            <NavLink
              to={el.link}
              className="nav__link"
              onClick={handleNavLinkClick}
            >
              {el.pageName}
            </NavLink>
          </li>
        ))}
        {userLoggedIn && (
          <>
            <li
              className={`nav__item ${
                shouldAnimate ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              <NavLink
                to="/admin"
                className="nav__link"
                onClick={handleNavLinkClick}
              >
                Admin
              </NavLink>
            </li>
            <li
              className={`nav__item ${
                shouldAnimate ? 'animate__animated animate__fadeInRight' : ''
              }`}
            >
              <NavLink to="/" onClick={handleNavLinkClick}>
                <Button
                  className="input-border"
                  variant="delete"
                  type="button"
                  onClick={doSignOut}
                >
                  Log out
                </Button>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

Navigation.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired,
}

export default Navigation
