import React, { useContext } from 'react'
import { Route, Redirect }  from 'react-router-dom'
import AuthenticationContext from './../../context/authentication/AuthenticationContext'

/* 
    The props passed in the parameter gonna destructing
    This is a private router using the class "Component" and the "rest" value take from the props
*/

const PrivateRouter = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthenticationContext)
    const { isAuthenticated, loading } = authContext;

    // There´s always a condition for the Private Router, so in this case, if have authenticated and not loading 

    return (
       <Route {...rest} render={props => !isAuthenticated && !loading ? (
           <Redirect to='/login' />
       ) : (
           <Component {...props} />
       )} />
    )
}

/* 
    Using the "Route" and "Redirect" for controll the access from fell pages (in this case just one)
    With component when he go to the "Component" he have that pass all props for that page;
*/

export default PrivateRouter
