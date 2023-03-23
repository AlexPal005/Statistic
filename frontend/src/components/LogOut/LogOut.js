import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {Link} from "react-router-dom";
import {MdOutlineAccountCircle} from "react-icons/md";
import "./LogOut.scss";

export const LogOut = () => {
    const {currentUser, logOut} = useContext(AuthContext);
    return (
        <>
            <Link to="/user/account/my-polls" className="side-bar__links-menu-item side-bar-account-item">
                <MdOutlineAccountCircle className="icon-account"/>
                <span className="nick-name">{currentUser?.nick_name}</span>
            </Link>
            <button type="submit" onClick={logOut} className="button-log-out">Вийти</button>
        </>
    );
};