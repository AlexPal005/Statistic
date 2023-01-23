import React, {useState} from "react";
import "./LogIn.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LogIn = () => {
    const [inputs, setInputs] = useState({
        nickName: "",
        password: "",
    });
    const [res, setRes] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/login", inputs);
            setTimeout(() => {
                navigate("/main");
            }, 2000);
        } catch (e) {
            setRes(e.response.data);
        }

    };
    return (
        <div className="form-registration log-in">
            <h1>Увійти</h1>
            <form>
                <p>Нікнейм</p>
                <input type="text" placeholder="Логін" name = "nickName" onChange={handleChange}/>
                <p>Пароль</p>
                <input type="password" placeholder="Пароль" name = "password" onChange={handleChange}/>
            </form>
            {res && <p className="error">{res}</p>}
            <button type="submit" onClick={handleSubmit}>Увійти</button>
        </div>
    );
};
export default LogIn;