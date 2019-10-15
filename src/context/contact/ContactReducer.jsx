import { ADD_CONTACT, DELETE_CONTACT, CONTACT_ERROR, SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, GET_CONTACTS, CLEAR_CONTACTS} from './types'

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case ADD_CONTACT: // Add a new Contact for that user
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case UPDATE_CONTACT: // Update the contact for the new data in form
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    return contact._id === action.payload._id ? action.payload : contact
                }),
                loading: false
            }
        case DELETE_CONTACT: // Remove a exist Contact from the user
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case SET_CURRENT_CONTACT: // Add the current contact to the form
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CONTACTS: // This will clear all the data after a user logout the system
            return {
                ...state,
                contacts: null,
                filter: null,
                error: null,
                current: null
            }
        case CLEAR_CURRENT_CONTACT: // Clear the current contact that is in the form
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACTS: // filter contacts by the name of the contacts add in the user
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    // create the regular expresion based on the text pass in the function "filterContacts()"
                    const regularExpression = new RegExp(action.payload, 'gi') // gi = global and case insensitive
                    return contact.name.match(regularExpression) || contact.email.match(regularExpression)
                })
            };
        case CLEAR_FILTER: // Clear the filter from contacs
            return {
                ...state,
                filter: null
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}