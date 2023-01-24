import React, {useContext, useState} from "react";
import "./Header.css";
import Logo from "./Logo";
import Menu from "./Menu";
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {ButtonAuth} from "./ButtonAuth";
import {AuthContext} from "../context/authContext";
import {LogOut} from "./LogOut";

export const Header = () => {
    const [burgerClick, setBurgerClick] = useState(false);

    const {currentUser} = useContext(AuthContext);
    const isAuth = () => {
        if (currentUser === null) {
            return false;
        }
        return true;
    }


    return (
        <nav className="header">

            <Logo/>
            <Menu burgerClick={burgerClick}/>
            <div className={
                burgerClick ? ["header__login-register", "header__login-register-active"].join(" ")
                    : ["header__login-register"]

            }>

            {isAuth() ?
            <LogOut></LogOut> :
            <ButtonAuth setBurgerClick = {setBurgerClick} burgerClick = {burgerClick}></ButtonAuth>}

            </div>
            <div className="mobile-button" onClick={
                () => {
                    setBurgerClick(!burgerClick);
                }
            }>
                {burgerClick ? <AiOutlineClose size="25px"/> : <AiOutlineMenu size="25px"/>}
            </div>
        </nav>

    );
}