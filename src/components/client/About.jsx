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
            <p>{item.desc}</p>
            <p>{item.num}</p>
            <p>{item.content}</p>
            <p>{item.period}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
