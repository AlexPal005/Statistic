import React, {useContext, useState} from "react";
import "./Header.scss";
import Logo from "../Logo";
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {BurgerMenu} from "./BurgerMenu";
import {ButtonAuth} from "../ButtonAuth";

export const Header = () => {
    const [burgerClick, setBurgerClick] = useState(false);
    return (
        <>
            <nav className="header">

                <Logo/>
                <ButtonAuth/>
                <div className="mobile-button" onClick={
                    () => {
                        setBurgerClick(!burgerClick);
                    }
                }>
                    {burgerClick ? <AiOutlineClose size="25px"/> : <AiOutlineMenu size="25px"/>}
                </div>
            </nav>
           <BurgerMenu burgerClick = {burgerClick}/>
        </>
    );
}