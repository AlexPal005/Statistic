import React from "react";
import {Link} from "react-router-dom";

const Menu = (props)=>{
    return(
        <div className={
            props.burgerClick ? ["header__menu", "header__menu-active"].join(" ") : ["header__menu"]
        }>
            <Link to = "/">
                <p>Додому</p>
            </Link>
            <Link to = "/AboutUs">
                <p>Про нас</p>
            </Link>
            <Link to = "/">
                <p>Контакти</p>
            </Link>
        </div>
    );
};

export default Menu;