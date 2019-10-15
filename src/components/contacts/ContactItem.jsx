import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from './../../context/contact/ContactContext';

const ContactItem = (props) => {

    const contactContext = useContext(ContactContext);

    // Destructing the objects
    const { deleteContact, setCurrentContact, clearCurrentContact } = contactContext;
    const { _id, name, email, phone, type } = props.contact 

    const onDelete = () => {
        deleteContact(_id);
        clearCurrentContact();
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '} 
                <span style={{ float: 'right'}}
                    className={
                        'badge ' + 
                        (type ===  'professional' ? 'badge-success' : 'badge-primary')
                    }>
                    {type.charAt(0).toUpperCase() + type.slice(1) /* Make the First Letter UpperCase */}
                </span>
            </h3>

            <ul className="list"> 
                {/* If there a email send, so...*/}
                {email && (
                    <li>
                        <i className="fas fa-envelope-open"></i> {email}
                    </li>
                )}
                {/* If there a email send, so...*/}
                {phone && (
                    <li>
                        <i className="fas fa-phone"></i> {phone}
                    </li>
                )}
            </ul>

            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrentContact(props.contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem
