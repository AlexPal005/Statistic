import {useContext} from "react";
import {AuthContext} from "../context/authContext";


export const LogOut = () => {
    const {currentUser, logOut} = useContext(AuthContext);
    return (
        <div>
            <span className="userNameText">{currentUser?.nick_name}</span>
            <button type="submit" onClick={logOut}>Вийти</button>
        </div>
    );
};