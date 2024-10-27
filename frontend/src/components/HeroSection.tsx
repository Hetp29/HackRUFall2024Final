import {
    Button,
    Center,
    Container,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { FunctionComponent } from "react";
  import { motion } from "framer-motion";
  
  const HeroSection: FunctionComponent = () => {
    return (
      <motion.div
        style={{ width: "100%" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container maxW="container.lg" mb={1} bg="transparent">
          <Center p={4} minHeight="70vh" bg="transparent">
            <VStack bg="transparent">
              
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Text
                  fontSize="2xl"
                  mb={4}
                  color="gray.700"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Never track your clients again—let us handle it.
                </Text>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Text fontSize="lg" color="gray.500" textAlign="center">
                  Effortlessly manage client interactions and streamline operations
                  with just a click using our CRM.
                </Text>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Text my={2} fontSize="sm" color="gray.500" textAlign="center">
                  Be an early user—dozens of businesses have joined our CRM in the
                  last 30 days!
                </Text>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  mt={4}
                  colorScheme="brand"
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Get started for free.
                </Button>
              </motion.div>
            </VStack>
          </Center>
        </Container>
      </motion.div>
    );
  };
  
  export default HeroSection;
  