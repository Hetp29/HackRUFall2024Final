import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";

interface FeatureProps {
  title: string;
  description: string;
  reverse?: boolean;
}

const Feature: FunctionComponent<FeatureProps> = ({
  title,
  description,
  reverse,
}: FeatureProps) => {
  const rowDirection = reverse ? "row-reverse" : "row";
  const animationProps = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div {...animationProps} style={{ width: "100%", minHeight: "auto", marginBottom: "2rem", marginTop: "1rem" }}>
      <Container maxW="container.xl" rounded="lg">
        <Stack
          spacing={[4, 16]}
          alignItems="center"
          direction={["column", null, rowDirection]}
          w="full"
        >
          <VStack maxW={500} spacing={4} align={["center", "flex-start"]}>
            <Box>
              <Text fontSize="3xl" fontWeight={600} align={["center", "left"]} textColor="black">
                {title}
              </Text>
            </Box>
            <Text fontSize="md" color="gray.500" textAlign={["center", "left"]}>
              {description}
            </Text>
            <Button
              colorScheme="brand"
              variant="link"
              textAlign={["center", "left"]}
            >
              Learn more →
            </Button>
          </VStack>
        </Stack>
      </Container>
    </motion.div>
  );
};

const features = [
  { title: "Trade Advice", description: "Receive algorithm-driven trade suggestions based on client data." },
  { title: "Risk Management", description: "Assess and manage risks associated with client portfolios." },
  { title: "Advanced Analytics", description: "Generate detailed reports and visualizations for better insights." },
  { title: "Integration with Financial Data Providers", description: "Integrate with financial data providers to access live financial information." },
  { title: "Client Communication Tools", description: "Communicate with clients via integrated email and messaging." },
  { title: "Automation and Workflow Management", description: "Automate tasks and manage workflows efficiently and seamlessly." },
];

export const FeaturesSection: FunctionComponent = () => {
  return (
    <motion.div
      id="features-section" // This should match the href in navLinks
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%", minHeight: "auto", padding: "3rem 0", background: "white" }}
    >
      <Container maxW="container.xl">
        <Stack spacing={8} mb={12} align="center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading size="2xl" mb={4} color="gray.700">
              Features
            </Heading>
          </motion.h2>
          <motion.div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {features.map((feature, index) => (
              <GridItem key={index}>
                <Feature
                  title={feature.title}
                  description={feature.description}
                  reverse={index % 2 === 0}
                />
              </GridItem>
            ))}
          </motion.div>
        </Stack>
      </Container>
    </motion.div>
  );
};
