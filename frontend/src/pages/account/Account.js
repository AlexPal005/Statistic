import "./Account.scss";
import React, {useState} from "react";
import {NewPoll} from "./NewPoll/NewPoll";
import {HiOutlineViewGridAdd} from "react-icons/hi";
import {MdOutlinePassword} from "react-icons/md";
import {IoMdReturnRight} from "react-icons/io";

export const Account = () => {
    const [newPollStatus, setNewPollStatus] = useState(false);
    const handleClick = () => {
      setNewPollStatus( prev => !prev);
    };
    return (
        <div className="content-account-page">
            <div className="side-bar">
                <div onClick={handleClick} className="side-bar__links-menu content-account-page__links-menu">
                    <HiOutlineViewGridAdd className="icon-menu"/>
                <span className="content-account-page__link">Додати голосування</span>
                </div>
                <div onClick={handleClick} className="side-bar__links-menu content-account-page__links-menu">
                    <MdOutlinePassword className="icon-menu"/>
                    <span className="content-account-page__link">Змінити пароль</span>
                </div>
                <div onClick={handleClick} className="side-bar__links-menu content-account-page__links-menu">
                    <IoMdReturnRight className="icon-menu"/>
                    <span className="content-account-page__link">Мої голоси</span>
                </div>
            </div>
            {newPollStatus && <NewPoll/>}
        </div>
    );
};