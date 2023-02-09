import "./Account.scss";
import React, {useEffect, useRef, useState} from "react";
import {NewPoll} from "./NewPoll/NewPoll";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {MdOutlinePassword} from "react-icons/md";
import {IoMdReturnRight} from "react-icons/io";
import {GoChecklist} from "react-icons/go";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import {MyPolls} from "./MyPolls.js/MyPolls";

export const Account = () => {
    const ref = useRef(null);
    const [events, setEvents] = useState(new Set());
    const location = useLocation();
    // set all events from menu to change color
    const handleClick = (e) => {
        events.forEach((event) => {
            event.classList.remove("active-link");
        });
        if (e.target.tagName === "path") {
            setEvents(prev => {
                let newEvents = new Set([...prev]);
                newEvents.add(e.target.parentNode.parentNode);
                return newEvents;
            });
            e.target.parentNode.parentNode.classList.add("active-link");
        } else if (e.target.tagName === "A") {
            e.target.classList.add("active-link");
        } else {
            setEvents(prev => {
                let newEvents = new Set([...prev]);
                newEvents.add(e.target.parentNode);
                return newEvents;
            });
            e.target.parentNode.classList.add("active-link");
        }
    };

    useEffect(() => {
        if(location.pathname === "/account/my-polls"){
            ref.current.classList.add("active-link");
        }
        else{
            ref.current.classList.remove("active-link");
        }
    }, [location]);

    return (
        <div className="content-account-page">
            <div className="side-bar">
                <Link to="/account/my-polls" className="side-bar__links-menu side-bar-account side-bar-margin" onClick={handleClick} ref = {ref}>
                    <GoChecklist className="icon-menu"/>
                    <span>Мої опитування</span>
                </Link>
                <Link to="/account/newPoll" className="side-bar__links-menu side-bar-account side-bar-margin" onClick={handleClick}>
                    <HiOutlineViewGridAdd className="icon-menu"/>
                    <span>Додати голосування</span>
                </Link>
                <div className="side-bar__links-menu side-bar-account side-bar-margin">
                    <MdOutlinePassword className="icon-menu"/>
                    <span>Змінити пароль</span>
                </div>
                <div className="side-bar__links-menu side-bar-account side-bar-margin">
                    <IoMdReturnRight className="icon-menu"/>
                    <span>Мої голоси</span>
                </div>
            </div>
            <Routes>
                <Route path="/newPoll" element={<NewPoll/>}/>
                <Route path="/my-polls" element={<MyPolls/>}/>
            </Routes>
        </div>

    );
};