import useFetchCollection from '../../hooks/useFetchCollection.js'
import { Link } from 'react-router-dom'

function Footer() {
  const { data: socialData } = useFetchCollection('social')
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__socials">
          {socialData
            .sort((a, b) => a.num - b.num)
            .map((item) => (
              <div className="footer__item" key={item.id}>
                <Link
                  className="footer__link"
                  to={item.link}
                  target="_blank"
                  rel="norefferer noopener"
                >
                  {item.images?.map(
                    (img, index) =>
                      img && (
                        <img
                          rel="preload"
                          loading="eager"
                          className="sidebar__icon"
                          key={index + 1}
                          src={img}
                          alt={`img-${index + 1}`}
                          width="20px"
                          height="20px"
                        />
                      ),
                  )}
                </Link>
              </div>
            ))}
        </div>
        <div className="footer__copyright">
          <p>Copyright © {year} All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
