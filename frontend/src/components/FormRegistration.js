import React, {useEffect, useState} from "react";
import "./FormRegistration.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FormRegistration = () => {
    const [inputs, setInputs] = useState({
        email: "",
        nickName: "",
        password: "",
        password2: ""

    });
    const [res, setRes] = useState("");
    const [checkTerms, setTerms] = useState(false);
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [password2Dirty, setPassword2Dirty] = useState(false);
    const [errorNickName, setErrorNickName] = useState("Нікнейм не може бути пустим");
    const [errorEmail, setErrorEmail] = useState("Пошта не може бути пустою");
    const [errorPassword, setErrorPassword] = useState("Пароль не може бути пустим");
    const [error2Password, setError2Password] = useState("");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (errorNickName || errorEmail || errorPassword || error2Password) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errorNickName, errorEmail, errorPassword, error2Password]);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
        setRes("");
        switch (e.target.name) {
            case 'nickName':
                validateNickName(e);
                break;
            case 'email':
                validateEmail(e);
                break;
            case 'password':
                validatePassword(e);
                break;
            case 'password2':
                validatePassword2(e);
                break;
            default:
                setRes("Помилка!");
                break;
        }
    };
    const validatePassword2 = (e) => {
        if (e.target.value !== inputs.password) {
            setError2Password("Паролі не співпадають!");
        } else {
            setError2Password("");
        }
    };
    const validatePassword = (e) => {
        const regex = /(?=[#$-/:-?{-~!"^_`a-zA-Z]*([0-9#$-/:-?{-~!"^_`])){8,30}/
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorPassword('Пароль має містити хоча б 8 символів, велику літеру, маленьку літеру, цифру!');
        } else {
            setErrorPassword("");
        }
        if (e.target.value !== inputs.password2) {
            setError2Password("Паролі не співпадають!");
        } else {
            setError2Password("");
        }
    };
    const validateNickName = (e) => {
        const regex = /^[a-z0-9_.]+$/;
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorNickName('Нікнейм має бути написаним латиницею з цифрами розділеними "." або "_"');
        } else {
            setErrorNickName("");
        }
    };
    const validateEmail = (e) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('Пошта введена некоректно');
        } else {
            setErrorEmail("");
        }
    };
    const handleChangeCheck = (e) => {
        setTerms(e.target.checked);
    };
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'nickName':
                setNickNameDirty(true);
                break;
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            case 'password2':
                setPassword2Dirty(true);
                break;
            default:
                setRes("Помилка!");
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkTerms) {
            try{
                const res = await axios.post("/auth/confirmation", inputs);
                navigate("/confirmation");
                console.log(res);
            }
            catch (e) {
                console.log(e);
            }

            // try {
            //     const res = await axios.post("/auth/register", inputs);
            //     setRes(res.data);
            //     navigate("/confirmation");
            // } catch (e) {
            //     setRes(e.response.data);
            // }
        } else {
            setRes("Ви не згодні з умовами користувача!");
        }
    };

    return (
        <div className="form-registration">
            <h1>Реєстрація</h1>
            <form>
                {(nickNameDirty && errorNickName) && <p>{errorNickName}</p>}
                <input required
                       className={(nickNameDirty && errorNickName) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="text"
                       placeholder="Нікнейм"
                       name="nickName"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(emailDirty && errorEmail) && <p>{errorEmail}</p>}
                <input required
                       className={(emailDirty && errorEmail) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="email"
                       placeholder="Email"
                       name="email"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(passwordDirty && errorPassword) && <p>{errorPassword}</p>}
                <input required
                       className={(passwordDirty && errorPassword) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="password"
                       placeholder="Пароль"
                       name="password"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(password2Dirty && error2Password) && <p>{error2Password}</p>}
                <input required
                       type="password"
                       className={(password2Dirty && error2Password) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Підтвердіть пароль" name="password2"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                <label>
                    <input required
                           type="checkbox"
                           name="checkTerms"
                           onChange={handleChangeCheck}
                    />
                    Згоден з умовами користувача
                </label>
            </form>
            {res && <p className="error">{res}</p>}
            <button disabled={!isValid} type="submit" onClick={handleSubmit}>Надіслати підтвердження</button>
        </div>
    );
};
export default FormRegistration;