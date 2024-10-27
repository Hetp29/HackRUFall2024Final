import {
    Accordion, 
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Heading,
    Stack,
    chakra
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export interface FAQType {
    q: string;
    a: string;
}

interface FAQSectionProps {
    items?: FAQType[];
}

const faqs: FAQType[] = [
    {
        q: 'What integrations does the CRM support?',
        a: 'Our CRM seamlessly integrates with popular tools like Notion, PipeDrive, and various financial data providers, allowing you to access live financial information directly within the platform.',
    },
    {
        q: 'Can I manage multiple workspaces and clients?',
        a: 'Yes, our CRM is designed to handle multiple workspaces and clients efficiently. With the Pro plan, you can manage an unlimited number of clients and customize workspaces to suit different projects or teams.',
    },
    {
        q: 'How secure is my data within the CRM?',
        a: 'We prioritize security with end-to-end encryption, regular security audits, and compliance with industry standards. Your data is safe, and you have full control over access permissions.',
    },
    {
        q: 'Can I automate my workflow within the CRM?',
        a: 'Absolutely! Our CRM includes powerful automation tools that allow you to create custom workflows, automate repetitive tasks, and streamline your client management processes.',
    },
    {
        q: 'Is there support for team collaboration?',
        a: 'Yes, the CRM is built with collaboration in mind. You can invite team members, assign roles, and work together in real-time on tasks, notes, and projects.',
    },
    {
        q: 'Can I track and manage sales pipelines with the CRM?',
        a: 'Yes, our CRM includes a robust sales pipeline management feature. You can track leads, monitor sales progress, and analyze pipeline data to optimize your sales strategy. Customizable stages and real-time updates ensure that you stay on top of your sales process.',
    }
];

export const FAQSection = ({ items = faqs }: FAQSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Container maxW="container.2xl" px={8} py={12} bg="white">
                <Stack spacing={8} align="center">
                    <motion.h2
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Heading size="2xl" mb={4} color="gray.700">
                            Frequently Asked Questions
                        </Heading>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Accordion allowToggle textColor="black">
                            {items.map((item, i) => (
                                <AccordionItem key={`faq_${i}`}>
                                    <Box width="100%"> {/* Ensures the width is consistent */}
                                        <h2>
                                            <AccordionButton
                                                _expanded={{ bg: 'gray.200' }}
                                                px={4}
                                                py={3}
                                                width="100%"
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Box flex="1" textAlign="left">
                                                    {item.q}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel 
                                            pb={4} 
                                            maxH="150px" 
                                            overflowY="auto"
                                        >
                                            {item.a}
                                        </AccordionPanel>
                                    </Box>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </Stack>
            </Container>
        </motion.div>
    );
};
