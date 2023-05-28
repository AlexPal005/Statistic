import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/authContext";

export const ChangePassword = () => {
    const currentUser = useContext(AuthContext);
    const [errorPassword1, setErrorPassword1] = useState("Пароль не може бути пустим");
    const [errorPassword2, setErrorPassword2] = useState("Пароль не може бути пустим");
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClickedPassword1, setIsClickedPassword1] = useState(false);
    const [isClickedPassword2, setIsClickedPassword2] = useState(false);
    const [res, setRes] = useState('');

    const validatePassword1 = (e) => {
        if (!e.target.value.length) {
            setErrorPassword1("Пароль не може бути пустим");
        } else {
            setErrorPassword1("");
        }
    }
    const validatePassword2 = (e) => {
        if (!e.target.value.length) {
            setErrorPassword2("Пароль не може бути пустим");
            return;
        }
        const regex = /(?=[#$-/:-?{-~!"^_`a-zA-Z]*([0-9#$-/:-?{-~!"^_`])){8,30}/
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorPassword2('Пароль має містити хоча б 8 символів, велику літеру, маленьку літеру, цифру!');
        } else {
            setErrorPassword2("");
        }
    }
    const handleChangePassword1 = (e) => {
        setIsClickedPassword1(true);
        setRes('');
        setPassword1(e.target.value);
        validatePassword1(e);
    };

    const handleChangePassword2 = (e) => {
        setIsClickedPassword2(true);
        setRes('');
        setPassword2(e.target.value);
        validatePassword2(e);
    };

    useEffect(() => {
        if (errorPassword1 || errorPassword2) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errorPassword1, errorPassword2, password1, password2]);

    const handleSubmit = () => {
        setIsLoading(true);
        axios.post('/polls/changePassword', {
            userId: currentUser.currentUser.id,
            password: password1,
            newPassword: password2
        })
            .then(response => {
                setRes(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setRes(err.response.data);
                setIsLoading(false);
            });
    }


    return (
        <div className="basic-form">
            <h1>Змінити пароль</h1>
            <form>
                {(isClickedPassword1 && errorPassword1) && <p className="error">{errorPassword1}</p>}
                <input
                    type="password"
                    className={(isClickedPassword1 && errorPassword1) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                    onChange={handleChangePassword1}
                    placeholder="Старий пароль"
                />
                {(isClickedPassword2 && errorPassword2) && <p className="error">{errorPassword2}</p>}
                <input
                    type="password"
                    onChange={handleChangePassword2}
                    className={(isClickedPassword2 && errorPassword2) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                    placeholder="Новий пароль"
                />
            </form>
            {isLoading ? <span>Loading...</span> :
                res && <p className="error">{res}</p>
            }
            <button
                disabled={!isValid}
                type="submit"
                className="button-form"
                onClick={handleSubmit}
            >
                Змінити
            </button>
        </div>
    );
}