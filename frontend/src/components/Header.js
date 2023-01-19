import React from "react";
import "./Header.css";
import Logo from "./Logo";
import Menu from "./Menu";
import {Link} from "react-router-dom";
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            burgerClick: false
        };
    }

    render() {
        return (
            <nav className="header">
                <Logo/>
                <Menu burgerClick = {this.state.burgerClick}/>
                <div className={
                    this.state.burgerClick ? ["header__login-register", "header__login-register-active"].join(" ")
                        :["header__login-register"]

                }>
                    <Link to="/registration">
                        <button onClick={
                            () => {
                                this.setState({burgerClick: !this.state.burgerClick})
                            }
                        }>Реєстрація</button>
                    </Link>
                    <Link to="/LogIn" onClick={
                        () => {
                            this.setState({burgerClick: !this.state.burgerClick})
                        }
                    }>
                        <button>Увійти</button>
                    </Link>
                </div>
                <div className="mobile-button" onClick={
                    () => {
                        this.setState({burgerClick: !this.state.burgerClick})
                    }
                }>
                    {this.state.burgerClick ?  <AiOutlineClose size="25px"/> : <AiOutlineMenu size="25px"/> }
                </div>
            </nav>
        );
    }
}