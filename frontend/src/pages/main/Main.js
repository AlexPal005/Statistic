import React from "react";
import "./Main.scss";
import {SideBar} from "../../components/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import {MainPolls} from "./MainPolls/MainPolls";
import {Introducing} from "./introducing/Introducing";

const Main = () => {
    return (
        <div className="wrapper-content">
            <SideBar/>
            <Routes>
                <Route path="/polls/:topicId" element={<MainPolls/>}/>
                <Route path="/" element={<Introducing/>}/>
            </Routes>
        </div>
    );
};
export default Main;