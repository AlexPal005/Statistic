import {createContext, useEffect, useState} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const login = async (inputs) => {
        try {
            const res = await axios.post("/auth/login", inputs);
            const jwtToken = res.data;
            const decodeUser = jwtDecode(jwtToken);
            setCurrentUser({...decodeUser, jwtToken: jwtToken});
        } catch (err) {
            throw err;
        }
    };

    const logOut = async () => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logOut}}>
            {children}
        </AuthContext.Provider>
    )
};