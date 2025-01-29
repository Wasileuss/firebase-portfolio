import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig.js";
import { collection, onSnapshot } from "firebase/firestore";

function ProjectsNew() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "courses"), (snapshot) => {
            const updatedData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setData(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="courses">
            <h1>Courses</h1>
            {data.map((item) => (
                <div key={item.id}>
                    <h3>{item.titleVal}</h3>
                    <a href={item.linkVal} target="_blank" rel="noopener noreferrer">
                        {item.linkVal}
                    </a>
                    <p>{item.descVal}</p>
                    <img src={item.imgUrl} alt={item.titleVal} width="100" />
                    <p>Added on: {item.timestamp && new Date(item.timestamp.seconds * 1000).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default ProjectsNew;