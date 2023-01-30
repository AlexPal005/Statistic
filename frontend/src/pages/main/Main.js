import React from "react";
import "./main.css";
import {SideBar} from "../../components/SideBar/SideBar";
const Main = ()=>{
    return(
        <div className="wrapper-content">
            <SideBar></SideBar>
            <div>Контент</div>
        </div>
    );
};
export default Main;