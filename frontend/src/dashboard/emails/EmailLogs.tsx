import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Box, Text, VStack } from '@chakra-ui/react';
import { Sidebar } from '../Sidebar';

interface EmailLog {
    recipient: string;
    subject: string;
    body: string;
    sent_at: string;
    status: string;
}

const EmailLogs: React.FC = () => {
    const [logs, setLogs] = useState<EmailLog[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/emails/logs/')
            .then(response => setLogs(response.data))
            .catch(error => console.error('Error fetching email logs:', error));
    }, []);

    return (
        <Flex h="100vh">
            <Sidebar userTier="Professional" />
            <Box p={4} bg="white" maxWidth="600px" mx="auto" boxShadow="md" borderRadius="md" flex="1">
                <Text fontSize="2xl" mb={4} color="black">Email Logs</Text>
                <VStack align="start" spacing={4}>
                    {logs.map((log, index) => (
                        <Box key={index} p={4} borderWidth="1px" borderRadius="md" w="100%">
                            <Text color="black"><strong>To:</strong> {log.recipient}</Text>
                            <Text color="black"><strong>Subject:</strong> {log.subject}</Text>
                            <Text color="black"><strong>Body:</strong> {log.body}</Text>
                            <Text color="black"><strong>Sent At:</strong> {new Date(log.sent_at).toLocaleString()}</Text>
                            <Text color="black"><strong>Status:</strong> {log.status}</Text>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Flex>
    );
};

export default EmailLogs;
