import React from 'react';
import { Sidebar } from '../../Sidebar';
import { Flex, Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import CustomerSegmentation from '../components/CustomerSegmentation';
import LifetimeValuePrediction from '../components/LifetimeValuePrediction';
import SentimentAnalysis from '../components/SentimentAnalysis';
import ProductRecommendation from '../components/ProductRecommendation';
import RFMAnalysis from '../components/RFMAnalysis';
import ChurnPrediction from '../components/ChurnPrediction';

const AnalyticsPage: React.FC = () => {
    return (
        <Flex h="100vh" overflow="hidden"> {/* Full height with no overflow */}
            <Sidebar userTier="Professional" /> {/* Sidebar on the left */}
            
            <Box flex="1" p={10} bg="#f7f9fc" overflowY="auto"> {/* Scrollable main content */}
                
                <Flex justify="center"> {/* Center the SimpleGrid horizontally */}
                    <SimpleGrid 
                        columns={{ base: 1, md: 2, lg: 2 }} // Adjust columns to avoid too many in one row
                        spacing={8} 
                        maxW="1200px" // Optional: set a max width for the grid
                        w="100%" // Full width within the Flex container
                    > 
                        {/* Customer Segmentation Box */}
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="lg" mb={4} color="black">Customer Segmentation</Text>
                            <CustomerSegmentation />
                            <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                        </Box>
                        
                        {/* Lifetime Value Prediction Box */}
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="lg" mb={4} color="black">Lifetime Value Prediction</Text>
                            <LifetimeValuePrediction />
                            <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                        </Box>
                        
                        {/* Sentiment Analysis Box */}
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="lg" mb={4} color="black">Sentiment Analysis</Text>
                            <SentimentAnalysis />
                            <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                        </Box>
                        
                        {/* RFM Analysis Box */}
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="lg" mb={4} color="black">RFM Analysis</Text>
                            <RFMAnalysis />
                            <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                        </Box>
                        
                        {/* Churn Prediction Box */}
                        <Box bg="white" p={6} borderRadius="md" shadow="md">
                            <Text fontSize="lg" mb={4} color="black">Churn Prediction</Text>
                            <ChurnPrediction />
                            <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Box>
        </Flex>
    );
};

export default AnalyticsPage;
