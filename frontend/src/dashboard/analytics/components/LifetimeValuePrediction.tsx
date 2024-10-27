import React, { useState, useEffect } from 'react';
import { Box, VStack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Chart as ChartJS } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LifetimeValuePrediction: React.FC = () => {
    const [age, setAge] = useState<number | ''>('');
    const [totalSpent, setTotalSpent] = useState<number | ''>('');
    const [frequency, setFrequency] = useState<number | ''>('');
    const [avgPurchaseValue, setAvgPurchaseValue] = useState<number | ''>('');
    const [lastPurchaseDate, setLastPurchaseDate] = useState<string>('');
    const [predictedValue, setPredictedValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lineChartData, setLineChartData] = useState({
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
        datasets: [
            {
                label: 'Spending Over Time',
                data: [200, 400, 600, 800, 1000],  // initial data, will change based on prediction
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    });

    const handlePredictLifetimeValue = async () => {
        if (age === '' || totalSpent === '' || frequency === '' || avgPurchaseValue === '' || lastPurchaseDate === '') {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);
        setPredictedValue(null);

        try {
            const response = await axios.post(`http://localhost:8000/analytics/ltv-prediction/`, {
                age,
                total_spent: totalSpent,
                frequency,
                avg_purchase_value: avgPurchaseValue,
                last_purchase_date: lastPurchaseDate,
            });
            setPredictedValue(response.data.predicted_lifetime_value);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(`Error: ${err.response.data.error}`);
            } else {
                setError('Error fetching lifetime value prediction');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Update chart data whenever the predicted value changes
        if (predictedValue !== null) {
            const spendingProjection = Array(5).fill(predictedValue).map((val, index) => val * (0.8 + index * 0.05));
            setLineChartData({
                ...lineChartData,
                datasets: [
                    {
                        ...lineChartData.datasets[0],
                        data: spendingProjection,
                    },
                ],
            });
        }
    }, [predictedValue]);

    return (
        <Box bg="white" p={6} borderRadius="md" shadow="md" color="gray.800">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">Lifetime Value Prediction</Text>
            
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel color="gray.700">Age</FormLabel>
                    <Input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        placeholder="Enter age"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.700">Total Spending</FormLabel>
                    <Input
                        type="number"
                        value={totalSpent}
                        onChange={(e) => setTotalSpent(Number(e.target.value))}
                        placeholder="Enter total spending"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.700">Frequency</FormLabel>
                    <Input
                        type="number"
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                        placeholder="Enter transaction frequency"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.700">Average Purchase Value</FormLabel>
                    <Input
                        type="number"
                        value={avgPurchaseValue}
                        onChange={(e) => setAvgPurchaseValue(Number(e.target.value))}
                        placeholder="Enter average purchase value"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.700">Last Purchase Date</FormLabel>
                    <Input
                        type="date"
                        value={lastPurchaseDate}
                        onChange={(e) => setLastPurchaseDate(e.target.value)}
                        placeholder="Enter last purchase date"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>

                <Button colorScheme="blue" onClick={handlePredictLifetimeValue} isLoading={loading} w="full">
                    Predict Lifetime Value
                </Button>

                {error && <Text color="red.500" fontSize="sm" textAlign="center">{error}</Text>}
                {predictedValue !== null && (
                    <Text fontSize="lg" color="green.600" mt={4}>
                        Predicted Lifetime Value: ${predictedValue}
                    </Text>
                )}
                
                <Box mt={8}>
                    <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800">Customer Spending Over Time</Text>
                    <Line data={lineChartData} />
                </Box>
            </VStack>
        </Box>
    );
};

export default LifetimeValuePrediction;
