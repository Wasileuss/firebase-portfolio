import React from 'react';
import logo from '../../assets/icons/logo.svg';


function Header({ isMenuOpen, handleMenuClick }) {

    return(
        <header className='header'>
            <div className ="header__container">
                <img className='header__logo' src={logo} alt="logo" />
                {/* <div className ="header__content">
                    <h2 className ="header__hello">Hello I'm</h2>
                    <div className ="header__animation">
                        <div className ="header__name"><div>Vasyl Bezkorovainyi</div></div>
                        <div className ="header__technology"><div>React</div></div>
                        <div className ="header__position"><div>Frontend Developer</div></div>
                    </div>
                </div> */}
                <button className={`icon-menu ${isMenuOpen ? 'menu-open' : ''}`} onClick={handleMenuClick}><span></span></button>
            </div>
        </header>
    );
}

export default Header;

