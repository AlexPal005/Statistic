import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

export const Confirmation = () => {
    const [res, setRes] = useState("");
    const [inputKey, setInputKey] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputKey(e.target.value);
    };

    const handleSubmit = async () => {
        if (inputKey === location.state.result) {
            try {
                const res = await axios.post("/auth/register", location.state.inputs);
                setRes(res.data);
                navigate("/LogIn");
            } catch (e) {
                setRes(e.response.data);
            }
        } else {
            setRes("Невірний код!");
        }
    }
    return (
        <div className="form-registration">
            <h1>Підтвердження</h1>
            <form>
                <input className="input-color-blue" type="text" placeholder="Код з пошти" onChange={handleChange}/>
            </form>
            {res && <p className="error">{res}</p>}
            <button type="submit" onClick={handleSubmit}>Зареєструватись</button>
        </div>
    );
};