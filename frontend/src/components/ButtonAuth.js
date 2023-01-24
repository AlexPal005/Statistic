import {Link} from "react-router-dom";
import React from "react";

export const ButtonAuth = (props) => {
    return (
        <>
            <Link to="/registration">
                <button onClick={
                    () => {
                        props.setBurgerClick(!props.burgerClick);
                    }
                }>Реєстрація</button>
            </Link>
            <Link to="/LogIn" onClick={
                () => {
                    props.setBurgerClick(!props.burgerClick);
                }
            }>
                <button>Увійти</button>
            </Link>
        </>
    );
}