import React, { useState } from 'react';
import { Box, Text, Button, Input, VStack, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import Chart components
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

interface SegmentationData {
    segments: number[];
}

const CustomerSegmentation: React.FC = () => {
    const [nClusters, setNClusters] = useState<number>(5);
    const [ageMin, setAgeMin] = useState<number>(18);
    const [ageMax, setAgeMax] = useState<number>(65);
    const [location, setLocation] = useState<string>('');
    const [spendingLevel, setSpendingLevel] = useState<number>(500);
    const [data, setData] = useState<number[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for adding a new customer
    const [newCustomerName, setNewCustomerName] = useState<string>('');
    const [newCustomerEmail, setNewCustomerEmail] = useState<string>(''); // New field for email
    const [newCustomerAge, setNewCustomerAge] = useState<number>();
    const [newCustomerGender, setNewCustomerGender] = useState<string>(''); // New field for gender
    const [newCustomerLocation, setNewCustomerLocation] = useState<string>('');
    const [newCustomerSpending, setNewCustomerSpending] = useState<number>();
    const [addCustomerError, setAddCustomerError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (nClusters <= 0 || nClusters > 50) {
            setError("Please enter a reasonable number for clusters (1-50).");
            return;
        }
        if (spendingLevel <= 0 || spendingLevel > 100000) {
            setError("Please enter a spending level between 1 and 100,000.");
            return;
        }
        if (ageMin > ageMax) {
            setError("Minimum age should not exceed maximum age.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get<SegmentationData>(`http://localhost:8000/analytics/customer-segmentation/`, {
                params: {
                    n_clusters: nClusters,
                    age_min: ageMin,
                    age_max: ageMax,
                    location: location || '',
                    spending_level: spendingLevel,
                },
            });
            setData(response.data.segments);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(`Error: ${err.response.data.error}`);
            } else {
                setError('Error fetching segmentation data');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle adding a new customer
    const handleAddCustomer = async () => {
        try {
            await axios.post('http://localhost:8000/analytics/add-customer/', {
                name: newCustomerName,
                email: newCustomerEmail,
                age: newCustomerAge,
                gender: newCustomerGender,
                location: newCustomerLocation,
                total_spent: newCustomerSpending,
            });
            setAddCustomerError(null);
            alert("Customer added successfully!");
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setAddCustomerError(`Error: ${err.response.data.error}`);
            } else {
                setAddCustomerError("Error adding customer.");
            }
        }
    };

    const chartData = {
        labels: data ? data.map((_, i) => `Segment ${i + 1}`) : [],
        datasets: [
            {
                label: 'Customer Segments',
                data: data || [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    return (
        <Box bg="white" p={6} borderRadius="md" shadow="md" color="gray.800">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.800">Customer Segmentation</Text>

            <VStack spacing={4} align="stretch">
                {/* Segmentation form */}
                <FormControl>
                    <FormLabel color="gray.700">Number of Clusters</FormLabel>
                    <Input
                        type="number"
                        value={nClusters}
                        onChange={(e) => setNClusters(Number(e.target.value))}
                        placeholder="Enter number of clusters"
                        bg="white"
                        borderColor="gray.300"
                        color="gray.800"
                        _placeholder={{ color: "gray.500" }}
                    />
                </FormControl>
                
                {/* Other fields... */}
                
                <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading} w="full">
                    Generate Segmentation
                </Button>
                {error && <Text color="red.500" fontSize="sm" textAlign="center">{error}</Text>}
                {data && <Box mt={6}><Pie data={chartData} key={JSON.stringify(chartData)} /></Box>}

                {/* Form to add a new customer */}
                <Text fontSize="lg" fontWeight="bold" mt={8} color="gray.800">Add New Customer</Text>
                <FormControl>
                    <FormLabel color="gray.700">Name</FormLabel>
                    <Input
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        placeholder="Enter customer name"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="gray.700">Email</FormLabel>
                    <Input
                        type="email"
                        value={newCustomerEmail}
                        onChange={(e) => setNewCustomerEmail(e.target.value)}
                        placeholder="Enter customer email"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="gray.700">Age</FormLabel>
                    <Input
                        type="number"
                        value={newCustomerAge}
                        onChange={(e) => setNewCustomerAge(Number(e.target.value))}
                        placeholder="Enter customer age"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="gray.700">Gender</FormLabel>
                    <Input
                        value={newCustomerGender}
                        onChange={(e) => setNewCustomerGender(e.target.value)}
                        placeholder="Enter customer gender"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="gray.700">Location</FormLabel>
                    <Input
                        value={newCustomerLocation}
                        onChange={(e) => setNewCustomerLocation(e.target.value)}
                        placeholder="Enter location"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="gray.700">Total Spending</FormLabel>
                    <Input
                        type="number"
                        value={newCustomerSpending}
                        onChange={(e) => setNewCustomerSpending(Number(e.target.value))}
                        placeholder="Enter total spending"
                        bg="white"
                        borderColor="gray.300"
                    />
                </FormControl>
                <Button colorScheme="teal" onClick={handleAddCustomer} mt={4}>
                    Add Customer
                </Button>
                {addCustomerError && <Text color="red.500" fontSize="sm" textAlign="center">{addCustomerError}</Text>}
            </VStack>
        </Box>
    );
};

export default CustomerSegmentation;

//For Add Test Customers to the database using the AddCustomerView endpoint.

//Customer 1: Name: "Alice", Age: 25, Location: "City A", Total Spent: 500
//Customer 2: Name: "Bob", Age: 40, Location: "City A", Total Spent: 1200
//Customer 3: Name: "Charlie", Age: 35, Location: "City B", Total Spent: 800
//Customer 4: Name: "Dana", Age: 50, Location: "City A", Total Spent: 1500
//Customer 5: Name: "Eve", Age: 60, Location: "City C", Total Spent: 2000
//Segmentation Test Parameters:

//Set n_clusters to 2 (we’re expecting two distinct groups).

//For this result I got an even split