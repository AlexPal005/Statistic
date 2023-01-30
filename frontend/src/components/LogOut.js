import {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {Link} from "react-router-dom";
import {MdOutlineAccountCircle} from "react-icons/md";


export const LogOut = () => {
    const {currentUser, logOut} = useContext(AuthContext);
    return (
        <div>
            <Link to ="/account" className="side-bar__links-menu">
                <MdOutlineAccountCircle className="icon-account"/>
                <span>{currentUser?.nick_name}</span>
            </Link>
            <button type="submit" onClick={logOut}>Вийти</button>
        </div>
    );
};