import React from "react";
import "./FormRegistration.css"

const FormRegistration = ()=>{
    return(
        <div className="form-registration">
            <h1>Реєстрація</h1>
            <form>
                <p>Нікнейм</p>
                <input type = "text" placeholder="Нікнейм"/>
                <p>Електронна пошта</p>
                <input type="email" placeholder="Email"/>
                <p>Пароль</p>
                <input type = "password" placeholder="Пароль"/>
                <p>Підтвердіть пароль</p>
                <input type = "password" placeholder="Пароль"/><br/>
                <label><input type = "checkbox"/>Згоден з умовами користувача</label>
            </form>
            <button type = "submit">Зареєструватись</button>
        </div>
    );
};
export default FormRegistration;