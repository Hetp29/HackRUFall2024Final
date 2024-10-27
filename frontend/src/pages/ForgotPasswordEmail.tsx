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
import { Link as RouterLink } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post(`${API_BASE_URL}/forgot-password/`, { email });
      toast({
        title: 'Email Sent.',
        description: 'Please check your email for a password reset link.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'An error occurred while sending the password reset email.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
          <Box flex="1" p={12} bg="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Container maxW="container.sm" textAlign="center">
              <Box mb={12}>
                <Heading size="2xl" mb={8} color="gray.800">Forgot Password</Heading>
              </Box>
              <form onSubmit={handleForgotPassword}>
                <Stack spacing={8}>
                  <FormControl id="email" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Enter your email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      _placeholder={{ color: 'gray.400' }}
                      borderColor="gray.300"
                      borderWidth="2px"
                      _hover={{ borderColor: 'gray.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                      fontSize="lg"
                      py={6}
                      textColor="black"
                    />
                  </FormControl>

                  <Button 
                    colorScheme="brand" 
                    type="submit" 
                    size="lg"
                    width="full"  
                    mt={4}  
                    py={6}
                  >
                    Send Reset Link
                  </Button>

                  <Text textAlign="center" mt={4} textColor="black">
                    Remember your password?{' '}
                    <Link as={RouterLink} to="/login" color="blue.500">
                      Go back to login.
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Container>
          </Box>
          
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image 
              src="/banner.webp" 
              alt="Forgot password illustration" 
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

export default ForgotPassword;
