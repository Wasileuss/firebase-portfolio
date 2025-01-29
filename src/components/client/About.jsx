import Sidebar from "./Sidebar.jsx";
import AnimatedWords from "../ui/AnimatedWords.jsx";

const Home = () => {
    return (
        <div className='about'>
            <Sidebar />
            <div className ="about__content">
                <AnimatedWords />
                <p className ="about__description">
                    Aspiring Frontend Developer with a passion for creating
                    user-friendly and visually appealing web interfaces. Proficient in
                    HTML, CSS, and JavaScript, with experience in React. Strong
                    problem-solving and debugging skills.
                </p>
            </div>
        </div>
    );
};

export default Home;
