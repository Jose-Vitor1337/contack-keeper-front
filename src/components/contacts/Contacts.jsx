import React, { Fragment, useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Spinner from './../layout/Spinner.jsx'
import ContactItem from './ContactItem'
import ContactContext from './../../context/contact/ContactContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    // destructoring
    const { contacts, filter, getContacts, loading } = contactContext

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])
 
    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact in the page</h4>
    } 

    /* 
        react-transition-group Documentation: https://reactcommunity.org/react-transition-group/
    */

    // Return the contacts that the user as add in hes page
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup> 
                    {filter !== null    
                        ? filter.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames="item"> 
                                <ContactItem contact={contact} />
                            </CSSTransition>
                            )) 
                        : contacts.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames="item">
                                <ContactItem contact={contact} />
                            </CSSTransition>
                            ))
                    }
                </TransitionGroup>

            ) : <Spinner />}
        </Fragment>
    )
}

export default Contacts
