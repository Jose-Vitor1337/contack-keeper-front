import React, { useContext, useEffect } from 'react'
import Contacts from './../contacts/Contacts'
import ContactForm from './../contacts/ContactForm'
import ContactFilter from './../contacts/ContactFilter'
import AuthenticationContext from '../../context/authentication/AuthenticationContext'

const Home = () => {
    const authenticationContext = useContext(AuthenticationContext)

    useEffect(() => {
        authenticationContext.loadUser();
        // eslint-disable-next-line
    }, []) // Only mimic the ComponentDidMount()

    return (
        <div className='grid-2'>
            <div>
               <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home