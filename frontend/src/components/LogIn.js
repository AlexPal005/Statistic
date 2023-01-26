import React, {useContext, useEffect, useState} from "react";
import "./LogIn.css"
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";

const LogIn = () => {
    const [inputs, setInputs] = useState({
        nickName: "",
        password: "",
    });
    const [res, setRes] = useState(null);
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorNickName, setErrorNickName] = useState("Нікнейм не може бути пустим");
    const [errorPassword, setErrorPassword] = useState("Пароль не може бути пустим");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    useEffect(() => {
        if (errorNickName || errorPassword ) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errorNickName,  errorPassword]);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
        setRes("");

    };
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'nickName':
                setNickNameDirty(true);
                if(e.target.value.length !== 0){
                    setErrorNickName("");
                }
                else{
                    setErrorNickName("Нікнейм не може бути пустим");
                }
                break;
            case 'password':
                setPasswordDirty(true);
                if(e.target.value.length !== 0){
                    setErrorPassword("");
                }
                else{
                    setErrorPassword("Пароль не може бути пустим");
                }
                break;
            default:
                setRes("Помилка!");
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(inputs);
            navigate("/main");
        } catch (e) {
            setRes(e.response.data);
        }
    };
    return (
        <div className="form-registration log-in">
            <h1>Увійти</h1>
            <form>
                {(nickNameDirty && errorNickName) && <p>{errorNickName}</p>}
                <input type="text"
                       className={(nickNameDirty && errorNickName) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Логін" name = "nickName" onChange={handleChange} onBlur={handleBlur}/><br/>
                {(passwordDirty && errorPassword) && <p>{errorPassword}</p>}
                <input type="password"
                       className={(passwordDirty && errorPassword) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Пароль" name = "password" onChange={handleChange} onBlur={handleBlur}/><br/>
            </form>
            {res && <p className="error">{res}</p>}
            <button disabled={!isValid} type="submit" onClick={handleSubmit}>Увійти</button>
        </div>
    );
};
export default LogIn;