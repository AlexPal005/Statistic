import "./Account.scss";
import React, {useState} from "react";
import {NewPoll} from "./NewPoll/NewPoll";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {MdOutlinePassword} from "react-icons/md";
import {IoMdReturnRight} from "react-icons/io";
import {Link, Route, Routes} from "react-router-dom";

export const Account = () => {
    return (

        <div className="content-account-page">
            <div className="side-bar">
                <Link to="/account/newPoll" className="side-bar__links-menu">
                    <div>
                        <HiOutlineViewGridAdd className="icon-menu"/>
                        <span>Додати голосування</span>
                    </div>
                </Link>
                <div className="side-bar__links-menu">
                    <MdOutlinePassword className="icon-menu"/>
                    <span>Змінити пароль</span>
                </div>
                <div className="side-bar__links-menu">
                    <IoMdReturnRight className="icon-menu"/>
                    <span>Мої голоси</span>
                </div>
            </div>
            <Routes>
                <Route path="/newPoll" element={<NewPoll/>}/>
            </Routes>
        </div>

    );
};