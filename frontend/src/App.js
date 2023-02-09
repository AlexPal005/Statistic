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
import {AuthContext} from "./context/authContext";

class App extends React.Component {
    static contextType = AuthContext;

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
                        <Route path="*" element={<Navigate to="/main" replace/>}/>
                        <Route
                            path="/registration"
                            element={this.context.currentUser ? <Navigate replace to="/main"/> : <FormRegistration/>}
                        />
                        <Route
                            path="/LogIn"
                            element={this.context.currentUser ? <Navigate replace to="/main"/> : <LogIn/>}
                        />
                        <Route
                            path="/confirmation"
                            element={this.context.currentUser ? <Navigate replace to="/main"/> : <Confirmation/>}
                        />
                        <Route
                            path="/account/*"
                            element={!this.context.currentUser ? <Navigate replace to="/main"/> : <Account/>}
                        />
                    </Routes>

                </div>
                <Footer/>
            </>
        );
    }
}

export default App;
