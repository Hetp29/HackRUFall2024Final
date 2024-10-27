import React, { useState } from 'react';
import { Box, Text, FormControl, FormLabel, Textarea, Button, VStack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysis: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [sentiment, setSentiment] = useState<string | null>(null);
    const [confidence, setConfidence] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyzeSentiment = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text for analysis.');
            return;
        }
        
        setLoading(true);
        setError(null);
        setSentiment(null);
        setConfidence(null);

        try {
            const response = await axios.post(`http://localhost:8000/analytics/sentiment-analysis/`, { text: inputText });
            setSentiment(response.data.label);
            setConfidence(response.data.score);
        } catch (err) {
            setError('Error analyzing sentiment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Prepare data for the pie chart based on confidence score
    const chartData = {
        labels: ['Confidence Score', 'Remaining'],
        datasets: [
            {
                label: 'Sentiment Confidence',
                data: confidence !== null ? [confidence * 100, 100 - confidence * 100] : [0, 100],
                backgroundColor: ['#4caf50', '#e0e0e0'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box>
            <VStack spacing={4} align="stretch">
                <FormControl>
                    <FormLabel textColor="gray.700">Enter Text for Sentiment Analysis</FormLabel>
                    <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your feedback or review here"
                        bg="white"
                        borderColor="gray.300"
                        color="black"
                    />
                </FormControl>
                
                <Button colorScheme="blue" onClick={handleAnalyzeSentiment} isLoading={loading}>
                    Analyze Sentiment
                </Button>

                {loading && <Spinner color="blue.500" />}

                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {sentiment && confidence !== null && (
                    <>
                        <Box mt={4} bg="gray.50" p={4} borderRadius="md" shadow="md" borderColor="gray.300">
                            <Text fontSize="lg" color="black">Sentiment: {sentiment}</Text>
                            <Text fontSize="lg" color="black">Confidence Score: {(confidence * 100).toFixed(2)}%</Text>
                        </Box>

                        <Box mt={4} p={4} borderRadius="md" shadow="md" borderColor="gray.300">
                            <Text fontSize="lg" color="black" mb={4}>Confidence Distribution</Text>
                            <Pie data={chartData} />
                        </Box>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default SentimentAnalysis;
