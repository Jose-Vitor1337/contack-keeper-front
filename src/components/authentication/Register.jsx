import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthenticationContext from '../../context/authentication/AuthenticationContext'

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authenticationContext = useContext(AuthenticationContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authenticationContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/') // redirect the user to another page
        }
        if (error === 'User already exist') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]); // ComponentDidUpdate() together with the ComponentDidMount()

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = user;

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== confirmPassword ) {
            setAlert('Password do not match', 'danger');
        } else {
            register({ name, email, password, })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="6"/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} minLength="6"/>
                </div>
                <input type="submit" value="Register a user" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register
