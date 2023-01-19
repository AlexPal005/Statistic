import React from "react";
import {Link} from "react-router-dom";
import logo from "../media/logo.png";

const Logo = ()=>{
    return(
        <div className= "header__logo">
            <Link to ="/main" className="logo-link">
                <img src = {logo} alt = "Statistics"/>
                <p>Statistic</p>
            </Link>
        </div>
    );
};

export default Logo;