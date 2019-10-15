import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import { ADD_CONTACT, GET_CONTACTS, CLEAR_CONTACTS, CONTACT_ERROR, DELETE_CONTACT, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER} from './types'

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filter: null,
        error: null
    };

    // Pass the states and the dispatch (that is each funcion will have is a action in the ContactReducer)
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }

    // Add contact
    const addContact = async (contact) => {

        // Add the Header for the Content-type because this will add a new contact passing JSON content
        const config = {
            headers: { 'Content-type' : 'application/json' }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)    

            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }

    }

    // Clear the contacts after logou  
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Delete contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`)    

            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }

    // Set the current contact in the form 
    const setCurrentContact = (contact) => {
        dispatch({ type: SET_CURRENT_CONTACT, payload: contact})
    }

    // Clear Current Contact
    const clearCurrentContact = () => {
        dispatch({ type: CLEAR_CURRENT_CONTACT })
    }

    // Update Contact
    const updateContact = async (contact) => {

        // Add the Header for the Content-type because this will add a new contact passing JSON content
        const config = {
            headers: { 'Content-type' : 'application/json' }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)    

            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }

    }

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text})
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }   

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrentContact,
                clearCurrentContact,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}>
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;