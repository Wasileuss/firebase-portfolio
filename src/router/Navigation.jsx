import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from './navigation.js';
import 'animate.css';
import PropTypes from 'prop-types';

const Navigation = ({ isMenuOpen, closeMenu }) => {
    const [shouldAnimate, setShouldAnimate] = useState(true);

    const handleNavLinkClick = () => {
        closeMenu();
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767.98) {
                setShouldAnimate(false);
            } else {
                setShouldAnimate(true);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul className='nav__list'>
                {navigation.map((el) => (
                    <li
                        key={Math.random() * 100}
                        className={`nav__item ${
                            shouldAnimate ? 'animate__animated animate__fadeInRight' : ''
                        }`}
                    >
                        <NavLink to={el.link} className="nav__link" onClick={handleNavLinkClick}>
                            {el.pageName}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Navigation.propTypes = {
    isMenuOpen: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

export default Navigation;