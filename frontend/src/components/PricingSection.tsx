import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  chakra,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';

const AnimatedBox = chakra(motion.div);
const AnimatedHeading = chakra(motion.h2);

interface PricingBoxProps {
  pro: boolean;
  name: 'Basic' | 'Professional' | 'Enterprise';
}

export const PricingBox: FunctionComponent<PricingBoxProps> = ({
  pro,
  name,
}: PricingBoxProps) => {
  const features: Record<'Basic' | 'Professional' | 'Enterprise', string[]> = {
    Basic: [
      'Core CRM functionalities',
      'Basic reporting and analytics',
      'Email integration',
      'Contact and lead management',
    ],
    Professional: [
      'Everything in Basic, plus:',
      'Advanced reporting and analytics',
      'CRM integrations with popular apps (e.g., Slack, Google Workspace)',
      'Automated workflows and task management',
      'Customizable dashboards',
      'Priority customer support',
    ],
    Enterprise: [
      'Everything in Professional, plus:',
      'Enterprise-grade security and compliance features',
      'Dedicated account manager',
      'Advanced customization options',
      'Multi-channel support',
      'Extensive integration options with other enterprise systems',
    ],
  };

  return (
    <AnimatedBox
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={pro ? 'white' : 'white'}
      borderColor={pro ? 'brand.500' : 'gray.200'}
      backgroundColor={pro ? 'brand.50' : 'white'}
      borderWidth={2}
      height="650px"
      width="full"
      maxWidth="350px"
      maxHeight="800px"
      id="pricing-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 } as any}
    >
      <VStack spacing={3} align="flex-start" color="black">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {name}
        </Text>
        <Box w="full">
          <Text fontSize="3xl" color="black" fontWeight="medium">
            {name === 'Basic' ? '$29' : name === 'Professional' ? '$59' : '$99'}
          </Text>
          <Text color="black" fontSize="sm">
            per user per month
          </Text>
        </Box>
        <Text color="black">Unlock key features and higher usage limits</Text>
        <VStack>
          <Button
            size="sm"
            colorScheme="brand"
            onClick={() => {
              window.location.href = '/register';
            }}
          >
            Free 14-day trial →
          </Button>
        </VStack>
        <VStack pt={8} spacing={4} align="flex-start">
          <Text fontWeight="medium">
            {name === 'Basic'
              ? 'Core features include:'
              : `Everything in ${name === 'Professional' ? 'Basic' : 'Professional'}, plus:`}
          </Text>
          <List spacing={3}>
            {features[name].map((feature, index) => (
              <ListItem key={index}>
                <HStack align="flex-start" spacing={1}>
                  <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                  <Text>{feature}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        </VStack>
      </VStack>
    </AnimatedBox>
  );
};

interface PricingSectionProps {}

export const PricingSection: FunctionComponent<PricingSectionProps> = () => {
  return (
    <VStack spacing={10} align="center" py={12} bg="white">
      <AnimatedHeading
        fontSize="4xl" // Replace size="2xl" with fontSize for chakra(motion.h2)
        mb={4}
        color="gray.700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 } as any}
      >
        Pricing
      </AnimatedHeading>
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        <PricingBox pro={false} name="Basic" />
        <PricingBox pro={true} name="Professional" />
        <PricingBox pro={false} name="Enterprise" />
      </SimpleGrid>
    </VStack>
  );
};
