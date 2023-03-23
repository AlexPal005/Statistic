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
        this.state = {
            userRoles: []
        }
        this.getRolesUser = this.getRolesUser.bind(this);
    }

       componentDidMount() {
        this.getRolesUser();

        if(this.state.userRoles.includes('ADMIN')){
            console.log(true);
        }
    }

    getRolesUser = () => {
        this.setState({userRoles: this.context.currentUser.roles});
    };

    render() {
        return (
            <>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/*' element={<Main/>}/>
                        <Route path='/admin' element={<div>AdminPanel</div>}></Route>
                        <Route path='/user'>
                            <Route
                                path="account/*"
                                element={!this.context.currentUser ? <Navigate replace to='/'/> : <Account/>}
                            />
                        </Route>
                        <Route
                            path="/registration"
                            element={this.context.currentUser ? <Navigate replace to="/"/> : <FormRegistration/>}
                        />
                        <Route
                            path="/LogIn"
                            element={this.context.currentUser ? <Navigate replace to="/"/> : <LogIn/>}
                        />
                        <Route
                            path="/confirmation"
                            element={this.context.currentUser ? <Navigate replace to="/"/> : <Confirmation/>}
                        />
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>

                </div>
                <Footer/>
            </>
        );
    }
}

export default App;
