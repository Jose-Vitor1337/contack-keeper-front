import React, { useState, useContext, useEffect } from 'react'
import ContactContext from './../../context/contact/ContactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext)

    // Destructing the object 
    const { addContact, current, clearCurrentContact, updateContact} = contactContext;

    // ComponentDidMount() and ComponentDidUpdate with hook useEffect(), this is very useful
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({ name: '', email: '', phone: '', type: 'personal' })
        }
    }, [contactContext, current]) // Only run again the effect if the one of these two values change
 
    const [contact, setContact] = useState({ name: '', email: '', phone: '',  type: 'personal' }) 

    // Destructing
    const { name, email, phone, type } = contact

    // Change the state value of each input field that have
    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value})
    } 

    // Clear the form data
    const clearAll = () => {
        clearCurrentContact();
    }
    
    // When click on the submit button
    const onSubmit = (event) => {
        event.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll(); // clear the form after a insert or update
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="Phone number" name="phone" value={phone} onChange={onChange}/>

            <h4>Contact Type</h4>
            <input 
                type="radio" 
                name="type" 
                value="personal" 
                onChange={onChange}
                checked={type === 'personal'}
            />Personal{' '}
            <input 
                type="radio" 
                name="type" 
                value="professional" 
                onChange={onChange}
                checked={type === 'professional'}
            />Professional{' '}

            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
            </div>

            {/* If theres a update contact, so this button will appear */}
            {current && (
                <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>
            )}
        </form>
    )
}

export default ContactForm
