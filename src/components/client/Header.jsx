import PropTypes from "prop-types"
import { Logo } from "../ui/Logo.jsx"
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../admin/Auth.jsx'
// import { doSignOut } from '../../firebaseAuth.js'

function Header({ isMenuOpen, handleMenuClick }) {
    // const navigate = useNavigate()
    // const { userLoggedIn } = useAuth()
    return(
        <header className='header'>
            <div className="header__container">
                <div className='header__logo'>
                    <Logo alt="logo" />
                </div>
                {/*<nav*/}
                {/*  className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-12 border-b place-content-center items-center bg-gray-200'>*/}
                {/*    {*/}
                {/*        userLoggedIn*/}
                {/*          ?*/}
                {/*          <>*/}
                {/*              <button onClick={() => {*/}
                {/*                  doSignOut().then(() => {*/}
                {/*                      navigate('/')*/}
                {/*                  })*/}
                {/*              }} className='text-sm text-blue-600 underline'>Log out*/}
                {/*              </button>*/}
                {/*          </>*/}
                {/*          :*/}
                {/*          <>*/}
                {/*              <Link className='text-sm text-blue-600 underline' to={'/login'}>Log in</Link>*/}
                {/*              <Link className='text-sm text-blue-600 underline' to={'/register'}>Sign up</Link>*/}
                {/*          </>*/}
                {/*    }*/}

                {/*</nav>*/}
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
