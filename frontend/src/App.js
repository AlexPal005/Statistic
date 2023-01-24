import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import FormRegistration from "./components/FormRegistration";
import LogIn from "./components/LogIn";
import {Header} from "./components/Header";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/registration" element={<FormRegistration/>}/>
                        <Route path = "/LogIn" element={<LogIn/>}/>
                    </Routes>
                </div>
                <Footer/>
            </>
        );
    }
}

export default App;
