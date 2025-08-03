import AnimatedWords from '../ui/AnimatedWords.jsx'
import useFetchCollection from '../../hooks/useFetchCollection.js'

const Home = () => {
  const { data: infoData } = useFetchCollection('info')
  return (
    <div className="about">
      <div className="about__content">
        <AnimatedWords />
        {infoData.map((item) => (
          <div className="about__description" key={item.id}>
            <h2>{item.title}</h2>
            {item.desc && <p>{item.desc}</p>}
            {item.content && <p>{item.content}</p>}
            {item.info1 && <p>{item.info1}</p>}
            {item.info2 && <p>{item.info2}</p>}
            {item.info3 && <p>{item.info3}</p>}
            {item.period && <p>{item.period}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
