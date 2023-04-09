import "./SideBar.scss";
import {NavLink} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {SlWallet} from "react-icons/sl";
import {TfiWorld} from "react-icons/tfi";
import {MdEmojiNature} from "react-icons/md";
import {CiBitcoin} from "react-icons/ci";
import {BsFillPersonFill} from "react-icons/bs";
import {BiNews} from "react-icons/bi";
import {GiEcology} from "react-icons/gi";

export const SideBar = () => {
    const [topics, setTopics] = useState(null);
    const [icons] = useState([
        <SlWallet className="icon-menu"/>,
        <TfiWorld className="icon-menu"/>,
        <MdEmojiNature className="icon-menu"/>,
        <CiBitcoin className="icon-menu"/>,
        <BsFillPersonFill className="icon-menu"/>,
        <BiNews className="icon-menu"/>,
        <GiEcology className="icon-menu"/>
    ]);

    useEffect(() => {
        const fetchData = () => {
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
            {topics && topics.map((topic, index) => {
                return (
                    <NavLink key={topic.id}
                             to={`polls/${topic.id}`}
                             className="side-bar__links-menu-item side-bar__links-menu-item-main"
                    >
                        {icons[index]}
                        <span>{topic.name}</span>
                    </NavLink>
                );
            })}
        </aside>
    );
};