import api from './../services/api'

/* 
    This is very important, this will permantly reload the token in the localStorage when 
    the user is authenticated in the system. This action is global (because is in a useEffect() hook )
*/

const setAuthenticationToken = (token) => {
    if ( token ) {
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete api.defaults.headers.common['x-auth-token']; 
    }
}

export default setAuthenticationToken;