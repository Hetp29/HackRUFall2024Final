import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ContactsList from './ContactsList';
import ContactForm from './ContactForm';
import { Sidebar } from '../Sidebar'; // Import Sidebar
import { Contact } from './types';
import axios from 'axios';

const ContactsPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/contacts/contacts/')
      .then(response => {
        console.log('Fetched contacts:', response.data);
        setContacts(response.data);
      })
      .catch(error => console.log('Error fetching contacts:', error));
  }, []);

  return (
    <Flex h="100vh">
      <Sidebar userTier="Professional" /> 

      {/* Sidebar for displaying contacts */}
      <Box w="30%" p={4}>
        {/* Pass contacts and setContacts to ContactsList */}
        <ContactsList contacts={contacts} setContacts={setContacts} setSelectedContact={setSelectedContact} />
      </Box>

      <Box flex="2" p={8} bg="white">
        <Box w="100%">
          <ContactForm
            editingContact={selectedContact}
            setEditingContact={setSelectedContact}
            setContacts={setContacts}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default ContactsPage;