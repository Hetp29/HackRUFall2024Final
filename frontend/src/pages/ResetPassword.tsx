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
  Image
} from '@chakra-ui/react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams(); 
  const token = searchParams.get('token');
  const uid = searchParams.get('uid');
  const toast = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error.',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    console.log('Token:', token);
    console.log('UID:', uid);

    try {
      await axios.post(`${API_BASE_URL}/reset-password/`, { password, token, uid });
      toast({
        title: 'Password Reset Successful.',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      navigate('/login');
      
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'An error occurred while resetting your password.',
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
          {/* Left Side - Form */}
          <Box flex="1" p={12} bg="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Container maxW="container.sm" textAlign="center">
              <Box mb={12}>
                <Heading size="2xl" mb={8} color="gray.800">Reset Password</Heading>
              </Box>
              <form onSubmit={handleResetPassword}>
                <Stack spacing={8}>
                  <FormControl id="password" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">New Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
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
                  <FormControl id="confirmPassword" isRequired>
                    <FormLabel fontSize="xl" color="gray.600">Confirm New Password</FormLabel>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
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
                    Reset Password
                  </Button>
                </Stack>
              </form>
            </Container>
          </Box>
          
          
          <Box flex="1" display={{ base: 'none', md: 'block' }}>
            <Image 
              src="/banner.webp" 
              alt="Reset password illustration" 
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

export default ResetPassword;
