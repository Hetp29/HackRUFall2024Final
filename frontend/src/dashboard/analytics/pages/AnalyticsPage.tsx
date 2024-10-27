import React from 'react';
import { Sidebar } from '../../Sidebar';
import { Flex, Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import CustomerSegmentation from '../components/CustomerSegmentation'; // Import CustomerSegmentation component
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
                
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}> {/* Center final card */}
                    
                    {/* Customer Segmentation Box */}
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">Customer Segmentation</Text>
                        <CustomerSegmentation /> {/* Include CustomerSegmentation chart component here */}
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box>
                    
                    {/* Lifetime Value Prediction Box */}
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">Lifetime Value Prediction</Text>
                        <LifetimeValuePrediction /> {/* Include LifetimeValuePrediction chart component here */}
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box>
                    
                    {/* Placeholder for Other Analytic Cards */}
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">Sentiment Analysis</Text>
                        <SentimentAnalysis />
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box>
                    
                    {/* <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">Product Recommendation</Text>
                        <ProductRecommendation customerId={1} />
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box> */}
                    
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">RFM Analysis</Text>
                        <RFMAnalysis />
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box>
                    
                    <Box bg="white" p={6} borderRadius="md" shadow="md">
                        <Text fontSize="lg" mb={4} color="black">Churn Prediction</Text>
                        <ChurnPrediction />
                        <Button size="sm" mt={4} colorScheme="blue">Edit Report</Button>
                    </Box>
                    
                </SimpleGrid>
            </Box>
        </Flex>
    );
};

export default AnalyticsPage;