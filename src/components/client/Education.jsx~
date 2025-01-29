import education from '../data/education.json';

const Education = () => {
    return (
        <div className='edu'>
            <h2 className='edu__title title'>Education</h2>
            <ul className='edu__list'>
                {education.map((item,idx) =>
                    <li className='edu__item' key={idx}>
                        <p className='edu__title'>{item.position}</p>
                        <p className='edu__link' aria-label={item.title}>{item.school}</p>
                        <span className='edu__period'>{item.period}</span>
                    </li>)}
            </ul>
        </div>
    );
}

export default Education