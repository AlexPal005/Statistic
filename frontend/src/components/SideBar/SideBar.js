import "./SideBar.scss";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export const SideBar = () => {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
        const fetchData = ()=>{
            axios.get("/main/topics")
                .then(response => setTopics(response.data))
                .catch(err => {
                    console.log(err);
                });
        }
        fetchData();
    }, []);

    return (
        <aside className="side-bar">
            {topics && topics.map((topic)=>{
                return <Link key = {topic.id} to="/main" className="side-bar__links-menu" ><span>{topic.name}</span></Link>
            })}
        </aside>
    );
};