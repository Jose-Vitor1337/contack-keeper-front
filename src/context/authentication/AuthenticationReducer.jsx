import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTHENTICATION_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from './types'

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:  // These two cases will do the same thing
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token); // set a item (value) to a local store in the aplication
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL: // These four cases will do the same thing
        case REGISTER_FAIL:  
        case AUTHENTICATION_ERROR:
        case LOGOUT:
            localStorage.removeItem('token'); // removing the token from a aplication local store
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}