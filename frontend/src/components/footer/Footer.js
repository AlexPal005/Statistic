import React from "react";
import "./Footer.scss";
import Logo from "../Logo";
import {BsFacebook, BsTwitter} from 'react-icons/bs';
import Menu from "../Menu";
import instLogo from "../../media/inst-logo.svg";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Logo/>
                <div className="footer__social-networks">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                        <BsFacebook color="#046de4" title = "Фейсбук"/>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <img src = {instLogo} className="instagram" alt="Інстаграм"  title = "Інстаграм"/>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                        <BsTwitter color="#1d9aef"  title = "Твітер"/>
                    </a>
                </div>
                <Menu/>
                <div className="text-about-creator">
                    <p>Created by:
                        <a href="https://t.me/olexandrsin" target="_blank" rel="noreferrer"> @olexandrsin</a>
                    </p>
                </div>
            </footer>

        );
    }
}

export default Footer;