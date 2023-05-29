import {NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import {AdminPolls} from "./AdminPolls/AdminPolls";
import {AddAdmin} from "./AddAdmin";

export const AdminPanelMain = () => {
    return(
        <div className='content-account-page'>
            <div className='side-bar'>
                <NavLink
                    to="/admin/polls"
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    exact="true"
                >
                    <span>Створені опитування</span>
                </NavLink>
                <NavLink
                    to="/admin/addAdmin"
                    className="side-bar__links-menu-item side-bar-account-item side-bar-margin"
                    exact="true"
                >
                    <span>Додати адміністратора</span>
                </NavLink>
            </div>
            <div className='content-my-polls'>
                <Routes>
                    <Route path="polls" element={<AdminPolls/>}/>
                    <Route path="addAdmin" element={<AddAdmin/>}/>
                    <Route path="" element={<AdminPolls/>}/>
                </Routes>
            </div>
        </div>
    );
};