import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationContext from './../../context/authentication/AuthenticationContext'
import ContactContext from './../../context/contact/ContactContext'

const Navbar = (props) => {
    const authenticationContext = useContext(AuthenticationContext); 
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authenticationContext;
    const { clearContacts } = contactContext

    const onLogout = () => {
        logout();
        clearContacts();
    }

    // Links that appears if you as loged in the aplication
    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-all"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    // Links that will apperas if you are a guest in this aplication
    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">   
            <h1>
                <i className={props.icon}/> {props.title}
            </h1>
            <ul>   
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    );
};

Navbar.defaultProps = {
    title: 'Contack Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
