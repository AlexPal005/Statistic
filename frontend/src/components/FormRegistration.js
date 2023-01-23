import React, {useState} from "react";
import "./FormRegistration.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FormRegistration = () => {
    const [inputs, setInputs] = useState({
        email: "",
        nickName: "",
        password: ""

    });
    const [res, setRes] = useState(null);
    const [checkTerms, setTerms] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };
    const handleChangeCheck = (e) => {
        setTerms(e.target.checked);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidateForm()) {
            try {
                const res = await axios.post("/auth/register", inputs);
                setRes(res.data);
                setTimeout(() => {
                    navigate("/LogIn");
                }, 2000);

            } catch (e) {
                setRes(e.response.data);
            }
        }

    };
    const isValidateForm = () => {
        for (const key in inputs) {
            if (inputs[key].length === 0) {
                setRes('Всі поля мають бути заповнені!');
                return false;
            }
        }
        if (inputs.nickName.length < 5) {
            setRes('Нікнейм має містити хоча б 5 символів!');
            return false;
        }
        let countDogs = 0;
        for (const char of inputs.email) {
            if (char === "@") {
                countDogs++;
            }
        }
        if (countDogs !== 1) {
            setRes('Пошта має містити один знак \'@\'!');
            return false;
        }
        if (inputs.password.length < 8 || inputs.password.length > 26) {
            setRes('Пароль має бути хоча б з 8 символів!');
            return false;
        }
        for (const char of inputs.password) {
            if (char === " ") {
                setRes('Пароль не має містити пусті символи!');
                return false;
            }
        }
        if (inputs.password !== inputs.password2) {
            setRes('Паролі не співпадають!');
            return false;
        }
        if (!checkTerms) {
            setRes('Ви не згодні з умовами користувача!');
            return false;
        }
        return true;
    }
    return (
        <div className="form-registration">
            <h1>Реєстрація</h1>
            <form>
                <p>Нікнейм</p>
                <input required type="text" placeholder="Нікнейм" name="nickName" onChange={handleChange}/>
                <p>Електронна пошта</p>
                <input required type="email" placeholder="Email" name="email" onChange={handleChange}/>
                <p>Пароль</p>
                <input required type="password" placeholder="Пароль" name="password" onChange={handleChange}/>
                <p>Підтвердіть пароль</p>
                <input type="password" placeholder="Пароль" name="password2" onChange={handleChange}/><br/>
                <label><input required type="checkbox" name="checkTerms" onChange={handleChangeCheck}/>Згоден з умовами
                    користувача</label>
            </form>
            {res && <p className="error">{res}</p>}
            <button type="submit" onClick={handleSubmit}>Зареєструватись</button>
        </div>
    );
};
export default FormRegistration;