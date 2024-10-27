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
  Stack,
  useToast,
  Flex,
  Image,
  Text,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Validation Error.',
        description: 'Please enter both email and password.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      navigate('/dashboard');
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        email,
        password,
      });
      console.log('User logged in:', response.data);
      toast({
        title: 'Login Successful.',
        description: 'You have successfully logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error during login:', error.response?.data);
        toast({
          title: 'Login Error.',
          description: error.response?.data?.message || 'An error occurred during login.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        console.error('Unexpected error during login:', error);
        toast({
          title: 'Login Error.',
          description: 'An unexpected error occurred during login.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" py={12}>
      <Box 
        w="full" 
        maxW="1600px"
        mx="auto" 
        bg="white" 
        boxShadow="lg" 
        borderRadius="md" 
        overflow="hidden"
      >
        <Flex height="100%" direction={{ base: 'column', md: 'row' }}>
          {/* Left Side - Form */}
          <Box flex="1" p={12} bg="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Container maxW="container.sm" textAlign="center">
              <Box mb={12}>
                <Heading size="2xl" mb={8} color="gray.800">Login</Heading>
              </Box>
              <form onSubmit={handleLogin}>
                <Stack spacing={8}>
                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Email Address</FormLabel>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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

                  <Text textAlign="center" mt={2} textColor="black">
                    Forgot your password?{' '}
                    <Link as={RouterLink} to="/forgot-password" color="blue.500">
                      Reset it here.
                    </Link>
                  </Text>

                  <Button 
                    colorScheme="brand" 
                    type="submit" 
                    size="lg"
                    width="full"  
                    mt={4}  
                    py={6}
                  >
                    Login
                  </Button>
                  {/* Link to Register Page */}
                  <Text textAlign="center" mt={4} textColor="black">
                    Don't have an account?{' '}
                    <Link as={RouterLink} to="/register" color="blue.500">
                      Create one.
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Container>
          </Box>
          
          {/* Right Side - Image */}
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image 
              src="/banner.webp" 
              alt="Login illustration" 
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

export default Login;
