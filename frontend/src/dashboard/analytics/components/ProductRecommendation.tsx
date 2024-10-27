import React, { useState } from 'react';
import { Box, Text, List, ListItem, Spinner, Alert, AlertIcon, Input, Button, VStack, Select } from '@chakra-ui/react';
import axios from 'axios';

const ProductRecommendation: React.FC<{ customerId: number }> = ({ customerId }) => {
    const [products, setProducts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleGetRecommendations = async () => {
        if (!category || !budget || !frequency) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);
        setProducts([]);

        try {
            const response = await axios.post(`http://localhost:8000/analytics/recommendations/`, {
                category,
                budget,
                frequency
            });
            setProducts(response.data.recommended_products);
        } catch (err) {
            setError('Error fetching product recommendations');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box bg="white" p={4} borderRadius="md" shadow="md">
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" color="gray.800">Enter Preferences for Recommendations</Text>

                <Text color="gray.600">Category</Text>
                <Select
                    placeholder="Select Category"
                    value={category}
                    textColor="black"
                    onChange={(e) => setCategory(e.target.value)}
                    borderColor="gray.300"
                >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                </Select>

                <Text color="gray.600">Budget</Text>
                <Input
                    placeholder="Enter budget"
                    value={budget}
                    textColor="black"
                    onChange={(e) => setBudget(e.target.value)}
                    borderColor="gray.300"
                />

                <Text color="gray.600">Frequency</Text>
                <Input
                    placeholder="Enter purchase frequency"
                    value={frequency}
                    textColor="black"
                    onChange={(e) => setFrequency(e.target.value)}
                    borderColor="gray.300"
                />

                <Button colorScheme="blue" onClick={handleGetRecommendations} isLoading={loading}>
                    Get Recommendations
                </Button>

                {loading && <Spinner color="blue.500" />}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {products.length > 0 && (
                    <List spacing={2}>
                        {products.map((product, index) => (
                            <ListItem key={index} color="gray.800">{product}</ListItem>
                        ))}
                    </List>
                )}
            </VStack>
        </Box>
    );
};

export default ProductRecommendation;
