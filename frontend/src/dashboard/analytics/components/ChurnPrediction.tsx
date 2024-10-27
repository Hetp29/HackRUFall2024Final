import React, { useState } from 'react';
import { Box, Text, FormControl, FormLabel, Input, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

const ChurnPrediction: React.FC = () => {
    const [lastInteraction, setLastInteraction] = useState('');
    const [engagementFrequency, setEngagementFrequency] = useState('');
    const [totalSpend, setTotalSpend] = useState('');
    const [tenure, setTenure] = useState('');
    const [age, setAge] = useState('');
    const [churnProbability, setChurnProbability] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePredictChurn = async () => {
        if (!lastInteraction || !engagementFrequency || !totalSpend || !tenure || !age) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/analytics/churn-prediction/`, {
                last_interaction: lastInteraction,
                engagement_frequency: engagementFrequency,
                total_spend: totalSpend,
                tenure,
                age
            });
            setChurnProbability(response.data.churn_probability);
        } catch (err) {
            setError('Error predicting churn. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" color="gray.800">Enter Customer Data for Churn Prediction</Text>
                
                <FormControl>
                    <FormLabel color="gray.600">Last Interaction Date</FormLabel>
                    <Input
                        type="date"
                        value={lastInteraction}
                        onChange={(e) => setLastInteraction(e.target.value)}
                        borderColor="gray.300"
                        textColor="black"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.600">Engagement Frequency</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter engagement frequency"
                        value={engagementFrequency}
                        onChange={(e) => setEngagementFrequency(e.target.value)}
                        borderColor="gray.300"
                        textColor="black"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.600">Total Spend</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter total spend"
                        value={totalSpend}
                        onChange={(e) => setTotalSpend(e.target.value)}
                        borderColor="gray.300"
                        textColor="black"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.600">Customer Tenure (months)</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter tenure"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        borderColor="gray.300"
                        textColor="black"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.600">Age</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        borderColor="gray.300"
                        textColor="black"
                    />
                </FormControl>

                <Button onClick={handlePredictChurn} colorScheme="blue" isLoading={loading}>Predict Churn</Button>

                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {churnProbability !== null && (
                    <Box mt={4} bg="gray.50" p={4} borderRadius="md" shadow="md">
                        <Text color="black">Churn Probability: {churnProbability}%</Text>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default ChurnPrediction;