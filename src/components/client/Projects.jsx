import useFetchCollection from '../../hooks/useFetchCollection.js'
import Loading from './Loading.jsx'

function Projects() {
  const { data: data, loading: loading } = useFetchCollection('projects')

  return (
    <div className="projects">
      <h1 className="projects__title title">Projects</h1>
      {loading ? (
        <Loading />
      ) : (
        data
          .sort((a, b) => b.num - a.num)
          .map((item) => (
            <div key={item.id}>
              {/*<p>No.&nbsp;{item.num}</p>*/}
              <h3>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <strong>{item.title}</strong>
                </a>
              </h3>
              <p>{item.desc}</p>
              <div className="projects__images">
                {item.images?.map(
                  (img, index) =>
                    img && (
                      <img
                        key={index}
                        src={img}
                        alt={`screenshot-${index + 1}-${item.title}`}
                        height="100px"
                      />
                    ),
                )}
              </div>
              <p>{item.content}</p>
              <p>{item.period}</p>
            </div>
          ))
      )}
    </div>
  )
}

export default Projects
