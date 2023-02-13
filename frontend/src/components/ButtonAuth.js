import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {LogOut} from "./LogOut";
import {AuthContext} from "../context/authContext";

export const ButtonAuth = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="header__login-register">
            {currentUser ?
                <LogOut></LogOut> :
                <>
                    <Link to="/registration">
                        <button className="button-sign-up">Реєстрація</button>
                    </Link>
                    <Link to="/LogIn">
                        <button className="button-log-in">Увійти</button>
                    </Link>
                </>
            }
        </div>

    );
}