import { Link } from 'react-router-dom';
import linkedin from '../../assets/icons/linkedin.svg';
import github from '../../assets/icons/github.svg';
import facebook from '../../assets/icons/facebook.svg';
import instagram from '../../assets/icons/instagram.svg';

function Footer() {
    const year = new Date().getFullYear();
    return(
        <footer className='footer'>
            <div className='footer__container'>
                <div className='sidebar__socials'>
                    <Link className='sidebar__link' to="https://www.facebook.com/wasyl.bezkorowainyi" target="_blank" rel="noreferrer">
                        <img src={facebook} alt="Facebook logo" />
                    </Link>
                    <Link className='sidebar__link' to="https://www.linkedin.com/in/vasyl-bezkorovainyi-ukraine/" target="_blank" rel="noreferrer">
                        <img src={linkedin} alt="Linkedin logo" />
                    </Link>
                    <Link className='sidebar__link' to="https://www.instagram.com/wasyl.lviv/" target="_blank" rel="noreferrer">
                        <img src={instagram} alt="Instagram logo" />
                    </Link>
                    <Link className='sidebar__link' to="https://github.com/Wasileuss/" target="_blank" rel="noreferrer">
                        <img src={github} alt="Github logo" />
                    </Link>
                </div>
                <div className='footer__copyright'>
                    <p>Copyright © {year} All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
