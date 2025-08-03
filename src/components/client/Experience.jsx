import useFetchCollection from '../../hooks/useFetchCollection.js'

function Experience() {
  const { data: experienceData } = useFetchCollection('experience')

  return (
    <div className="experience">
      <h1 className="experience__title title">Experience</h1>
      {experienceData
        .sort((a, b) => a.num - b.num)
        .map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <h3>{item.desc}</h3>
            <p>{item.period}</p>
            <a href={item.subLink} target="_blank" rel="noopener noreferrer">
              {item.subTitle}
            </a>
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
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.content}
            </a>
          </div>
        ))}
    </div>
  )
}

export default Experience
