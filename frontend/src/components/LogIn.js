import React from "react";
import "./LogIn.css"

const LogIn = () => {
    return (
        <div className="form-registration log-in">
            <h1>Увійти</h1>
            <form>
                <p>Нікнейм або пошта</p>
                <input type="text" placeholder="Логін"/>
                <p>Пароль</p>
                <input type="password" placeholder="Пароль"/>
            </form>
            <button type="submit">Увійти</button>
        </div>
    );
};
export default LogIn;