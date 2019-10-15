import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from './../../context/contact/ContactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)

    const text = useRef(''); // The new hook for references

    useEffect(() => {
        if (contactContext.filter === null) {
            text.current.value = '';
        }
    })

    const onChange = (event) => {
        if (text.current.value !== '') { // Take the text value and see if it is different from empty
            contactContext.filterContacts(event.target.value)
        } else {
            contactContext.clearFilter();
        }
    }

    return (
        <form>
            <input ref={text} type="text" name="" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter
