import React, { useState, useContext, useEffect } from 'react'
import AuthenticationContext from './../../context/authentication/AuthenticationContext'
import AlertContext from './../../context/alert/AlertContext'

const Login = (props) => {
    const authenticationContext = useContext(AuthenticationContext)
    const alertContext = useContext(AlertContext)

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authenticationContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/') // redirect the user to another page
        }
        if (error === 'Email e/or password invalid') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]); // ComponentDidUpdate() together with the ComponentDidMount()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill all the fields', 'danger')
        } else {
            login( { email, password })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login
