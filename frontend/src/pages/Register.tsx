import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
  Flex,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState('');
  const [companyName, setCompanyName] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register/`, {
        password,
        email,
        name,
        job_title: jobTitle,
        phone,
        employees,
        company_name: companyName
      });
      console.log('Registration successful:', response.data);
  

      toast({
        title: 'Registration Successful.',
        description: 'You have successfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error during registration:', error.response?.data);
        toast({
          title: 'Registration Error.',
          description: 'An error occurred during registration.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.error('Unexpected error during registration:', error);
        toast({
          title: 'Unexpected Error.',
          description: 'An unexpected error occurred.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={12}>
      <Box 
        w="full" 
        maxW="1600px"
        mx="auto" 
        bg="white" 
        boxShadow="lg" 
        borderRadius="md" 
        overflow="hidden"
      >
        <Flex>
          <Box flex="1" p={16} bg="white">
            <Container maxW="container.md">
              <Box textAlign="center" mb={12}>
                <Heading size="2xl" mb={8} color="gray.800">Sign Up</Heading>
              </Box>
              <form onSubmit={handleSubmit}>
                <Stack spacing={8}>
                  <FormControl id="name" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Full Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>
                  <FormControl id="job-title" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Job Title</FormLabel>
                    <Input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Enter your job title"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Email Address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Phone Number</FormLabel>
                    <Input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>
                  <FormControl id="employees" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Number of Employees</FormLabel>
                    <Select
                      value={employees}
                      borderColor="gray.300"
                      borderWidth="2px"
                      placeholder="Select number of employees"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      onChange={(e) => setEmployees(e.target.value)}
                      fontSize="lg"
                      py={6}
                      color={employees ? 'black' : 'gray.400'}
                    >
                      <option value="1-30" style={{ color: 'black' }}>1-30</option>
                      <option value="31-300" style={{ color: 'black' }}>31-300</option>
                      <option value="301-10,000" style={{ color: 'black' }}>301-10,000</option>
                      <option value="10,001+" style={{ color: 'black' }}>10,001+</option>
                    </Select>
                  </FormControl>

                  <FormControl id="company-name" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Company Name</FormLabel>
                    <Input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter your company name"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor='black'
                    />
                  </FormControl>

                  <Stack spacing={4} align="center">
                    <Button 
                      colorScheme="brand" 
                      type="submit" 
                      size="lg"
                      width="full"  
                      mt={6}
                      py={6}
                    >
                      Register
                    </Button>
                    <Box>
                      <Text fontSize="md" color="gray.600" mt={4}>
                        Already have an account? <Link color="blue.500" href="/login">Log in</Link>
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </form>
            </Container>
          </Box>

          {/* Right Side - Image */}
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image 
              src="/banner.webp" 
              alt="Signup illustration" 
              objectFit="cover" 
              w="full" 
              h="100%" 
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;