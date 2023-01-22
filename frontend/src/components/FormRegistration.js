import React, {useState} from "react";
import "./FormRegistration.css"
import axios from "axios";

const FormRegistration = () => {
    const [inputs, setInputs] = useState({
        email: "",
        nickName: "",
        password: "",

    });

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/register",inputs);
            console.log(res);
        }
        catch(e){
            console.log(e);
        }

    };
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
                <input type="password" placeholder="Пароль" onChange={handleChange}/><br/>
                <label><input required type="checkbox"/>Згоден з умовами користувача</label>
            </form>
            <button type="submit" onClick={handleSubmit}>Зареєструватись</button>
        </div>
    );
};
export default FormRegistration;