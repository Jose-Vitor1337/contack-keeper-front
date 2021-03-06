import React, { useReducer } from 'react'
import uuid from 'uuid'
import AlertContext from './AlertContext'
import alertReducer from './AlertReducer'
import { SET_ALERT, REMOVE_ALERT } from './types'

const AlertState = (props) =>{
    const initialState = []

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set a alert to a message
    const setAlert = (msg, type, timeout=3000) => {
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });
 
        setTimeout(() =>  dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state, // All the state is a array of alerts
                setAlert            
            }}
        >
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertState;
