import {useContext} from "react";
import {AuthContext} from "../context/authContext";
import {Link} from "react-router-dom";
import {MdOutlineAccountCircle} from "react-icons/md";


export const LogOut = () => {
    const {currentUser, logOut} = useContext(AuthContext);
    return (
        <>
            <Link to ="/account/my-polls" className="side-bar__links-menu side-bar-account text-logout">
                <MdOutlineAccountCircle className="icon-account"/>
                <span>{currentUser?.nick_name}</span>
            </Link>
            <button type="submit" onClick={logOut}>Вийти</button>
        </>
    );
};