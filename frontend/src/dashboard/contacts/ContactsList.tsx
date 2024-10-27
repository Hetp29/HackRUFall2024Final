import React from 'react';
import axios from 'axios';
import { Contact } from './types';

interface ContactsListProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, setContacts, setSelectedContact }) => {
  const deleteContact = (id: number) => {
    axios.delete(`http://localhost:8000/contacts/contacts/${id}/`)
      .then(() => setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id)))
      .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px', color: 'black' }}>
      <h2>Contacts List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} style={{ marginBottom: '10px', listStyleType: 'none', padding: '8px', borderBottom: '1px solid #ddd' }}>
            <div>
              <strong>Name:</strong> {contact.name}
            </div>
            <div>
              <strong>Email:</strong> {contact.email}
            </div>
            <div>
              <strong>Phone Number:</strong> {contact.phone_number}
            </div>
            <div>
              <strong>Company:</strong> {contact.company}
            </div>
            <button onClick={() => setSelectedContact(contact)} style={{ marginRight: '8px' }}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
