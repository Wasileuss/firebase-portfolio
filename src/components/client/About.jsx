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
            <p>{item.title}</p>
            <p>{item.desc}</p>
            <p>{item.content}</p>
            <p>{item.info1}</p>
            <p>{item.info2}</p>
            <p>{item.info3}</p>
            <p>{item.period}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
