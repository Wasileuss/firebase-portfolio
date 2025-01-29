import contacts from '../../data/contacts.json';
import avatar from '../../assets/images/photo.webp';
import { LuSmartphone } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { SiSkypeforbusiness } from "react-icons/si";
import { PiTelegramLogo } from "react-icons/pi";
import { TbFileDownload } from "react-icons/tb";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig.js";
import { collection, onSnapshot } from "firebase/firestore";

const iconArr = [ LuSmartphone, FiMail, SiSkypeforbusiness, PiTelegramLogo, TbFileDownload ];

function Sidebar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "about"), (snapshot) => {
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
        <div className='sidebar'>
            <img className='sidebar__avatar' src={avatar} alt="avatar" />
            <ul className='sidebar__list'>
                {contacts.map((item, idx) => {
                    const Icon = iconArr[idx];
                    return (
                        <li className='sidebar__item' key={idx}>
                            <Icon className='sidebar__icon' />
                            <a
                                className='sidebar__contact'
                                href={item.href}
                                title={item.title}
                                target={item.target}
                                rel={item.rel}
                                aria-label={item.title}
                            >
                                {item.body}
                            </a>
                        </li>
                    );
                })}
            </ul>
            {data.map((item) => (
                <div key={item.id}>
                    <img src={item.imgUrl} alt={item.titleVal} width="100"/>
                    <a
                        href={item.linkVal}
                        target={item.targetVal}
                        rel={item.relVal}>
                        {item.titleVal}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;