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
import {AdminPanelMain} from "./pages/Admin/AdminPanelMain";

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
    }

    getRolesUser = () => {
        this.setState({userRoles: this.context?.currentUser?.roles});
    };

    render() {
        return (
            <>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path='/*' element={<Main/>}/>
                        {
                            (this.state.userRoles && this.state.userRoles.includes('ADMIN')) &&
                            <Route path='/admin/*' element={<AdminPanelMain/>}>
                            </Route>
                        }
                        {
                            (this.state.userRoles && this.state.userRoles.includes('USER')) &&
                            <Route path='/user'>
                                <Route
                                    path="account/*"
                                    element={!this.context.currentUser ? <Navigate replace to='/'/> : <Account/>}
                                />
                            </Route>
                        }

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
