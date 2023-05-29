import "./Account.scss";
import React from "react";
import {NewPoll} from "./NewPoll/NewPoll";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {MdOutlinePassword} from "react-icons/md";
import {IoMdReturnRight} from "react-icons/io";
import {GoChecklist} from "react-icons/go";
import {NavLink, Route, Routes} from "react-router-dom";
import {MyPolls} from "./MyPolls/MyPolls";
import {ChangePassword} from "./ChangePassword";
import {VotedPolls} from "./VotedPolls";

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
                <NavLink
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    to="/user/account/changePassword">
                    <MdOutlinePassword className="icon-menu"/>
                    <span>Змінити пароль</span>
                </NavLink>
                <NavLink
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    to="/user/account/votedPolls"
                >
                    <IoMdReturnRight className="icon-menu"/>
                    <span>Мої голоси</span>
                </NavLink>
            </div>
            <Routes>
                <Route path="newPoll" element={<NewPoll/>}/>
                <Route path="my-polls" element={<MyPolls/>}/>
                <Route path="changePassword" element={<ChangePassword/>}/>
                <Route path="votedPolls" element={<VotedPolls/>}/>
            </Routes>
        </div>

    );
};