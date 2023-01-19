import React from "react";
import "./Footer.css";
import Logo from "./Logo";
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs';
import Menu from "./Menu";

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer">
                <Logo/>
                <div className="footer__social-networks">
                    <a href ="https://www.facebook.com/" target="_blank" rel = "noreferrer">
                        <BsFacebook color="grey"/>
                    </a>
                    <a href ="https://www.instagram.com/" target="_blank" rel = "noreferrer">
                        <BsInstagram color ="grey"/>
                    </a>
                    <a href ="https://www.twitter.com/" target="_blank" rel = "noreferrer">
                        <BsTwitter color = "grey"/>
                    </a>
                </div>
                <Menu/>
                <div className="text-about-creator">
                    <p>Created by:
                        <a href = "https://t.me/olexandrsin" target="_blank" rel = "noreferrer"> @olexandrsin</a>
                    </p>
                </div>
            </footer>

        );
    }
}
export default Footer;