import './App.scss';
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Footer from "./components/footer/Footer";
import FormRegistration from "./components/FormRegistration/FormRegistration";
import LogIn from "./components/LogIn/LogIn";
import {Header} from "./components/header/Header";
import {Confirmation} from "./components/Confirmation";
import {Account} from "./pages/account/Account";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/registration" element={<FormRegistration/>}/>
                        <Route path="/LogIn" element={<LogIn/>}/>
                        <Route path="/confirmation" element={<Confirmation/>}/>
                        <Route path="/account/*" element={<Account/>}/>
                        <Route path="*" element={<Navigate to="/main" replace/>}/>
                    </Routes>
                </div>
                <Footer/>
            </>
        );
    }
}

export default App;
