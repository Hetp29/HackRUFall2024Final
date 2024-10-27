import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
// @ts-ignore
import { Link as ScrollLink } from 'react-scroll';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Features', href: 'features-section' },
  { name: 'Pricing', href: 'pricing-section' },
  { name: 'Solutions', href: '/solutions' },
];

const DesktopSidebarContents = ({ name }: any) => {
  return (
    <Container maxW="container.lg" p={0} textColor="black">
      <Flex w="full" justify="space-between" align="center">
        <Flex align="center" ml={4}>
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Image src="logo.png" alt="Company Logo" width="150px" />
          </Link>
        </Flex>
        <Stack spacing={[4, 10]} direction={['column', 'row']} align="center">
          {navLinks.map((navLink: any, i: number) => (
            <ScrollLink to={navLink.href} smooth={true} duration={500} key={`navlink_${i}`}>
              <Box as="span" fontWeight={500} color="black"> {/* Ensure text color is black */}
                {navLink.name}
              </Box>
            </ScrollLink>
          ))}
        </Stack>
      </Flex>
    </Container>
  );
};

const MobileSidebar = ({ name }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" align="center" p={2} justify="space-between">
        <Flex align="center">
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Image src="logo.png" alt="Company Logo" width="120px" />
          </Link>
        </Flex>
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          color="black"  // Change the icon color to black
          size="md"
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent bg="gray.50">
            <DrawerCloseButton color="black" /> {/* Ensure the close button is black */}
            <DrawerHeader color="black">{name}</DrawerHeader> {/* Ensure header text is black */}
            <DrawerBody>
              <Stack spacing={6} align="center" w="full">
                {navLinks.map((navLink: any, i: number) => (
                  <ScrollLink to={navLink.href} smooth={true} duration={500} key={`navlink_${i}`} onClick={onClose}>
                    <Box as="span" fontWeight={500} width="full" textAlign="center" color="black"> {/* Ensure text color is black */}
                      {navLink.name}
                    </Box>
                  </ScrollLink>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

interface SidebarProps {
  name: string;
}

const Sidebar = ({ name }: SidebarProps) => {
  return (
    <chakra.header
      id="header"
      bg="white"
      color="gray.800"
      borderBottom="1px solid #e0e0e0"
      position="relative"
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '0px',
        left: '0',
        width: '100%',
        height: '6px',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent)',
      }}
    >
      <Box display={{ base: 'flex', md: 'none' }} p={2}>
        <MobileSidebar name={name} />
      </Box>
      <Box display={{ base: 'none', md: 'flex' }} bg="white">
        <DesktopSidebarContents />
      </Box>
    </chakra.header>
  );
};

interface HeaderProps {
  name: string;
}

export const Navbar = ({ name }: HeaderProps) => {
  return (
    <Box w="full">
      <Sidebar name={name} />
    </Box>
  );
};
