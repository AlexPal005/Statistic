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
            <div className='content-my-polls'>
                <Routes>
                    <Route path="polls">
                        <Route path=":topicId" element={<MainPolls/>}/>
                        <Route path='introducing' element={<Introducing/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};
export default Main;