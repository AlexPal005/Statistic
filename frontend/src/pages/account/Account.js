import "./Account.scss";
import React from "react";
import {NewPoll} from "./NewPoll/NewPoll";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {MdOutlinePassword} from "react-icons/md";
import {IoMdReturnRight} from "react-icons/io";
import {GoChecklist} from "react-icons/go";
import {NavLink, Route, Routes} from "react-router-dom";
import {MyPolls} from "./MyPolls/MyPolls";

export const Account = () => {

    return (
        <div className="content-account-page">
            <div className="side-bar">
                <NavLink
                    to="/user/account/my-polls"
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    exact="true"
                >
                    <GoChecklist className="icon-menu"/>
                    <span>Мої опитування</span>
                </NavLink>
                <NavLink
                    to="/user/account/newPoll"
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    exact="true"
                >
                    <HiOutlineViewGridAdd className="icon-menu"/>
                    <span>Додати голосування</span>
                </NavLink>
                <div className="side-bar__links-menu-item side-bar-account-item side-bar-margin">
                    <MdOutlinePassword className="icon-menu"/>
                    <span>Змінити пароль</span>
                </div>
                <div className="side-bar__links-menu-item side-bar-account-item side-bar-margin">
                    <IoMdReturnRight className="icon-menu"/>
                    <span>Мої голоси</span>
                </div>
            </div>
            <Routes>
                <Route path="newPoll" element={<NewPoll/>}/>
                <Route path="my-polls" element={<MyPolls/>}/>
            </Routes>
        </div>

    );
};