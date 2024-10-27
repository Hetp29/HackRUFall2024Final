import React, { useState } from 'react';
import { Box, Text, FormControl, FormLabel, Input, Button, VStack, List, ListItem, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RFMAnalysis: React.FC = () => {
    const [transactions, setTransactions] = useState<{ date: string; amount: string }[]>([]);
    const [transactionDate, setTransactionDate] = useState('');
    const [amount, setAmount] = useState('');
    const [rfmScore, setRfmScore] = useState<{ recency: number; frequency: number; monetary: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAddTransaction = () => {
        if (!transactionDate || !amount) {
            setError('Please enter a valid date and amount.');
            return;
        }

        setTransactions([...transactions, { date: transactionDate, amount }]);
        setTransactionDate('');
        setAmount('');
        setError(null);
    };

    const handleAnalyzeRFM = async () => {
        if (transactions.length === 0) {
            setError('Please add at least one transaction.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:8000/analytics/rfm-analysis/`, { transactions });
            setRfmScore(response.data.rfm_score);
        } catch (err) {
            setError('Error analyzing RFM. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Prepare radar chart data
    const radarData = {
        labels: ['Recency', 'Frequency', 'Monetary'],
        datasets: [
            {
                label: 'RFM Scores',
                data: rfmScore ? [rfmScore.recency, rfmScore.frequency, rfmScore.monetary] : [0, 0, 0],
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box>
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" color="gray.800">Enter Transaction Data for RFM Analysis</Text>
                
                <FormControl>
                    <FormLabel color="gray.600">Transaction Date</FormLabel>
                    <Input
                        type="date"
                        textColor="black"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        borderColor="gray.300"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel color="gray.600">Amount</FormLabel>
                    <Input
                        type="number"
                        textColor="black"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        borderColor="gray.300"
                    />
                </FormControl>

                <Button onClick={handleAddTransaction} colorScheme="blue" size="sm">Add Transaction</Button>

                {transactions.length > 0 && (
                    <List spacing={2} mt={4}>
                        {transactions.map((transaction, index) => (
                            <ListItem key={index} color="gray.800">
                                {transaction.date} - ${transaction.amount}
                            </ListItem>
                        ))}
                    </List>
                )}

                <Button onClick={handleAnalyzeRFM} colorScheme="green" isLoading={loading}>Analyze RFM</Button>

                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {rfmScore && (
                    <Box mt={4} bg="gray.50" p={4} borderRadius="md" shadow="md">
                        <Text color="black">Recency Score: {rfmScore.recency}</Text>
                        <Text color="black">Frequency Score: {rfmScore.frequency}</Text>
                        <Text color="black">Monetary Score: {rfmScore.monetary}</Text>

                        <Box mt={4}>
                            <Radar data={radarData} options={{ maintainAspectRatio: true }} />
                        </Box>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default RFMAnalysis;
