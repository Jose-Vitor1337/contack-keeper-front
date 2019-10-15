import axios from 'axios';

/* 
    This is very important, this will permantly reload the token in the localStorage when 
    the user is authenticated in the system. This action is global (because is in a useEffect() hook )
*/

const setAuthenticationToken = (token) => {
    if ( token ) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token']; 
    }
}

export default setAuthenticationToken;