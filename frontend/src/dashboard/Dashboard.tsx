import React, { useState } from 'react';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar'; // Keep the Sidebar component
import ContactsList from './contacts/ContactsList'; // Import the ContactsList component
import { Contact } from './contacts/types';
import ContactsPage from './contacts/ContactsPage';
import SendEmailForm from './emails/SendEmailForm';
import EmailLogs from './emails/EmailLogs';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Flex h="100vh">
      <Sidebar userTier="Professional" />

      <Box p={8} textAlign="center" flex="1" bg="gray.50">
        <Routes>
          <Route path="/" element={
            <>
              <Heading as="h1" size="2xl" textColor="black" mb={4}>
                Welcome to ClientSync
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Your dashboard is ready to manage your projects and clients efficiently.
              </Text>
              <Button colorScheme="red" onClick={handleLogout} mt={6}>
                Log Out
              </Button>
            </>
          }/>
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/email" element={<SendEmailForm />} /> {/* Send Email Form */}
          <Route path="/email/logs" element={<EmailLogs />} /> {/* Email Logs */}
        </Routes>
      </Box>
    </Flex>
  );
};

export default Dashboard;