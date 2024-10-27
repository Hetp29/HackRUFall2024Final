import { Box, Text, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      style={{
        backgroundColor: "#f8f9fa", // Light gray for subtle contrast
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        color: "#333", // Dark gray for readability on light backgrounds
        padding: "1rem 0",
        textAlign: "center",
        width: "100%",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Stack spacing={2} align="center">
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} ClientSync. All rights reserved.
        </Text>
        <Stack direction="row" spacing={4} justify="center">
          <motion.a
            href="/privacy"
            style={{ color: "#007bff" }} // Blue for clickable links
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="/terms"
            style={{ color: "#007bff" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Terms of Service
          </motion.a>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default Footer;
