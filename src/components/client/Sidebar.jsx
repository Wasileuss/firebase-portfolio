import useFetchCollection from '../../hooks/useFetchCollection.js'
import { Link } from 'react-router-dom'

function Sidebar() {
  const { data: aboutData } = useFetchCollection('about')
  const { data: infoData } = useFetchCollection('info')

  return (
    <>
      <div className="sidebar">
        {infoData.map((item) => (
          <div className="sidebar__avatar" key={item.id}>
            {item.images?.map(
              (img, index) =>
                img && (
                  <img
                    rel="preload"
                    loading="eager"
                    key={index}
                    src={img}
                    alt="avatar"
                  />
                ),
            )}
          </div>
        ))}
        <div className="sidebar__list">
          {aboutData
            .sort((a, b) => a.num - b.num)
            .map((item) => (
              <div className="sidebar__item" key={item.id}>
                {item.images?.map(
                  (img, index) =>
                    img && (
                      <img
                        rel="preload"
                        loading="eager"
                        className="sidebar__icon"
                        key={index}
                        src={img}
                        alt={`img-${index}`}
                        width="20px"
                        height="20px"
                      />
                    ),
                )}
                <Link
                  className="sidebar__contact"
                  to={item.link}
                  target={item.content ? item.content : null}
                  rel={item.period ? item.period : null}
                >
                  {item.title}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
