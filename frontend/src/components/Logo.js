import React from "react";
import {Link} from "react-router-dom";
import logo from "../media/logo1.png";

const Logo = ()=>{
    return(
        <div className= "header__logo">
            <Link to ="/" className="logo-link">
                <img src = {logo} alt = "Statistics"/>
                <p>Statistic</p>
            </Link>
        </div>
    );
};

export default Logo;