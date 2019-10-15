import React, { useReducer } from 'react'
import axios from 'axios'
import AuthenticationContext from './AuthenticationContext'
import authenticationReducer from './AuthenticationReducer'
import setAuthenticationToken from './../../security/setAuthenticationToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTHENTICATION_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from './types'

const AuthenticationState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'), // get a item (value) in the aplication local store
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [ state, dispatch ] = useReducer(authenticationReducer, initialState);

    // Load User
    const loadUser = async () => {

        // Load token into a global headers
        if (localStorage.token) {
            setAuthenticationToken(localStorage.token);
        } 

        try {
            const response = await axios.get('/api/authentication');

            dispatch( { type: USER_LOADED, payload: response.data })
        } catch (error) {
            dispatch( { type: AUTHENTICATION_ERROR })
        }
    }

    // Register a user in the system
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json   '
            }
        }
        try {
            const response = await axios.post('/api/users', formData, config);

            dispatch({ type: REGISTER_SUCCESS, payload: response.data })

            loadUser(); // this function maintem the token into the global headers for all the aplications actions
        
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg // return a object error in register fail.
            })
        }
    }

    // Login user in the system
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/authentication', formData, config);

            dispatch({ type: LOGIN_SUCCESS, payload: response.data})

            loadUser();
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg})
        }
    }

    // Logout the user
    const logout = () => {
        dispatch({ type: LOGOUT })
    }

    // clear errors in the system
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    return (
        <AuthenticationContext.Provider
            value = { // The props that will be pass in this context when some component pull this in the aplication
                {
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                    loading: state.loading,
                    error: state.error,
                    user: state.user,
                    register,
                    loadUser,
                    login,
                    logout,
                    clearErrors
                }
            }
        >
            { props.children }
        </AuthenticationContext.Provider>
    )

};

export default AuthenticationState