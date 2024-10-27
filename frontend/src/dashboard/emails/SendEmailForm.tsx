import React, { useState } from 'react';
import axios from 'axios';
import { Flex, Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Text } from '@chakra-ui/react';
import { Sidebar } from '../Sidebar';

const SendEmailForm: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/emails/send/', { recipient, subject, body });
            setStatusMessage('Email sent successfully');
        } catch (error) {
            setStatusMessage('Failed to send email');
        }
        setRecipient('');
        setSubject('');
        setBody('');
    };

    return (
        <Flex h="100vh">
            <Sidebar userTier="Professional" />
            <Box p={4} bg="white" maxWidth="500px" mx="auto" boxShadow="md" borderRadius="md" flex="1">
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel color="black">Recipient</FormLabel>
                        <Input
                            type="email"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter recipient's email"
                            color="black"
                            borderColor="blue.400"
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            _placeholder={{ color: 'gray.500' }}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Subject</FormLabel>
                        <Input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter email subject"
                            color="black"
                            borderColor="blue.400"
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            _placeholder={{ color: 'gray.500' }}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black">Body</FormLabel>
                        <Textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter email content"
                            color="black"
                            borderColor="blue.400"
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            _placeholder={{ color: 'gray.500' }}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full">
                        Send Email
                    </Button>
                    {statusMessage && <Text color="black">{statusMessage}</Text>}
                </VStack>
            </Box>
        </Flex>
    );
};

export default SendEmailForm;
