import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaUsers, FaEnvelope, FaCogs, FaLayerGroup, FaShieldAlt, FaChartLine } from 'react-icons/fa';


export const Sidebar = ({ userTier }: { userTier: 'Basic' | 'Professional' | 'Enterprise' }) => {
    return (
      <Box bg="white" w="250px" h="100vh" color="black" p={4}>
        <VStack align="start" spacing={4}>
          <Link href="/dashboard">
            <Icon as={FaHome} mr={2} />
            <Text>Dashboard Overview</Text>
          </Link>
          <Link href="/contacts">
            <Icon as={FaUsers} mr={2} />
            <Text>Contact Management</Text>
          </Link>
          <Link href="/email">
            <Icon as={FaEnvelope} mr={2} />
            <Text>Email Integration</Text>
          </Link>
          <Link href="/analytics">
            <Icon as={FaChartLine} mr={2} />
            <Text>{userTier === 'Basic' ? 'Basic Analytics' : 'Advanced Analytics'}</Text>
          </Link>
  
          {userTier !== 'Basic' && (
            <>
              <Link href="/integrations">
                <Icon as={FaLayerGroup} mr={2} />
                <Text>Integrations</Text>
              </Link>
              <Link href="/workflows">
                <Icon as={FaCogs} mr={2} />
                <Text>Automated Workflows</Text>
              </Link>
              <Link href="/custom-dashboards">
                <Icon as={FaChartLine} mr={2} />
                <Text>Custom Dashboards</Text>
              </Link>
            </>
          )}
  
          {userTier === 'Enterprise' && (
            <>
              <Link href="/security">
                <Icon as={FaShieldAlt} mr={2} />
                <Text>Security & Compliance</Text>
              </Link>
              <Link href="/account-management">
                <Icon as={FaUsers} mr={2} />
                <Text>Account Management</Text>
              </Link>
            </>
          )}
        </VStack>
      </Box>
    );
  };