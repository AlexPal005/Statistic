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
                        <button>Реєстрація</button>
                    </Link>
                    <Link to="/LogIn">
                        <button>Увійти</button>
                    </Link>
                </>
            }
        </div>

    );
}