import React, {useEffect, useState} from "react";
import axios from "axios";

export const AddAdmin = () => {
    const [errorNickName, setErrorNickName] = useState("Нікнейм не може бути пустим");
    const [nickName, setNickName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [res, setRes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClickedInput, setIsClickedInput] = useState(false);

    const validateNickName = (e) => {
        if (!e.target.value.length) {
            setErrorNickName("Нікнейм не може бути пустим");
            return;
        }
        const regex = /^[a-z0-9_.]+$/;
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorNickName('Нікнейм має бути написаним латиницею з цифрами розділеними "." або "_"');
        } else {
            setErrorNickName("");
        }
    };

    useEffect(() => {
        if (errorNickName) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errorNickName, nickName]);

    const handleChange = (e) => {
        setIsClickedInput(true);
        setRes('');
        setNickName(e.target.value);
        validateNickName(e);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        axios.post('/admin/addAdmin', {
            userName: nickName
        })
            .then(response => {
                setRes(response.data.message);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setRes(err.response.data.message);
                setIsLoading(false);
            });
    }

    return (
        <div className="basic-form">
            <h1>Доступ до adminPanel</h1>
            <form>
                {(isClickedInput && errorNickName) && <p className="error">{errorNickName}</p>}
                <input required
                       type="text"
                       placeholder="Нікнейм"
                       name="nickName"
                       className={(isClickedInput && errorNickName) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       onChange={handleChange}
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
                Додати
            </button>
        </div>
    );
};