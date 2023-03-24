import {createContext, useEffect, useState} from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(null);
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const login = async (inputs) => {
        axios.post("/auth/login", inputs)
            .then(response => {
                const jwtToken = response.data;
                const decodeUser = jwtDecode(jwtToken);
                setCurrentUser({...decodeUser, jwtToken: jwtToken});
            })
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