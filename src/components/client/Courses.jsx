import useFetchCollection from '../../hooks/useFetchCollection.js'

function ProjectsNew() {
  const { data: coursesData } = useFetchCollection('courses')

  return (
    <div className="courses">
      <h1 className="courses__title title">Courses</h1>
      {coursesData
        .sort((a, b) => a.num - b.num)
        .map((item) => (
          <div key={item.id}>
            <h3>{item.desc}</h3>
            <h2>{item.title}</h2>
            <p>{item.period}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.content}
            </a>
          </div>
        ))}
    </div>
  )
}

export default ProjectsNew
