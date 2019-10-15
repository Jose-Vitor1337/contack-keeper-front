import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/authentication/Register'
import Login from './components/authentication/Login'
import Alerts from './components/layout/Alerts'
import PrivateRoute from './components/routing/PrivateRouter'

import AuthenticateState from './context/authentication/AuthenticationState'
import ContactState from './context/contact/ContactState'
import AlertState from './context/alert/AlertState'
import setAuthenticationToken from './security/setAuthenticationToken'

import './App.css';

// Load token into a global headers
if (localStorage.token) {
    setAuthenticationToken(localStorage.token);
} 


const App = () => {
  return (
    <AuthenticateState>
        <ContactState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Navbar />
                        <div className="container">
                            <Alerts />
                            <Switch>
                                <PrivateRoute exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route exact path='/register' component={Register}/>
                                <Route exact path='/login' component={Login}/>
                            </Switch>
                        </div>  
                    </Fragment>
                </Router>               
            </AlertState>
        </ContactState>
    </AuthenticateState>
  );
}

export default App;
