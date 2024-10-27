import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Contact } from './types'; 
import { Box, FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react'; // Import Chakra components

interface ContactFormProps {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  editingContact: Contact | null;
  setEditingContact: React.Dispatch<React.SetStateAction<Contact | null>>;
}

const ContactForm: React.FC<ContactFormProps> = ({ setContacts, editingContact, setEditingContact }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [company, setCompany] = useState<string>('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhoneNumber(editingContact.phone_number);
      setCompany(editingContact.company);
    }
  }, [editingContact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const contactData: Contact = { 
      id: editingContact ? editingContact.id : 0,  // Assign a default value for new contacts
      name, 
      email, 
      phone_number: phoneNumber, 
      company 
    };
  
    if (editingContact) {
      axios.put(`http://localhost:8000/contacts/contacts/${editingContact.id}/`, contactData)
        .then(response => {
          setContacts(prevContacts => 
            prevContacts.map(contact => contact.id === response.data.id ? response.data : contact)
          );
          setEditingContact(null);
        })
        .catch(error => console.error('Error updating contact:', error));
    } else {
      axios.post('http://localhost:8000/contacts/contacts/', contactData)
        .then(response => setContacts(prevContacts => [...prevContacts, response.data]))
        .catch(error => console.error('Error creating contact:', error));
    }
  
    // Clear form fields after submission
    setName('');
    setEmail('');
    setPhoneNumber('');
    setCompany('');
  };

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      p={6} 
      //bg="gray.50" 
      borderRadius="md" 
      border="1px solid" 
      borderColor="gray.200" 
      shadow="md" 
    >
      <Stack spacing={4}>
        
        <FormControl isRequired>
          <FormLabel color="black">Name</FormLabel>
          <Input 
            type="text" 
            color="black"
            placeholder="Enter Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            bg="white" 
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }} // Input hover effect
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }} // Focus effect
          />
        </FormControl>


        <FormControl isRequired>
          <FormLabel color="black">Email</FormLabel>
          <Input 
            type="email" 
            color="black"
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            bg="white" 
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }} 
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </FormControl>

        
        <FormControl isRequired>
          <FormLabel color="black">Phone Number</FormLabel>
          <Input 
            type="text" 
            color="black"
            placeholder="Enter Phone Number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            bg="white" 
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }} 
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </FormControl>

        
        <FormControl>
          <FormLabel color="black">Company</FormLabel>
          <Input 
            type="text" 
            color="black"
            placeholder="Enter Company" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
            bg="white" 
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }} 
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
          />
        </FormControl>

        
        <Button 
          type="submit" 
          colorScheme="blue" 
          width="full" 
          bg="blue.500" 
          color="white" 
          _hover={{ bg: "blue.600" }}
        >
          {editingContact ? 'Update Contact' : 'Add Contact'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;