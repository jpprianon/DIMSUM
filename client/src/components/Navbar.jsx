import {
  Box,
  Image,
  Icon,
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import Logo from "../Logo/Logo.svg";
import { useState } from "react";

const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  return (
    <Flex color="white">
      <Text fontStyle="italic" as="sub" fontSize="xs" color="white">
        {cart.length}
      </Text>
      <Icon
        ml="-1.5"
        as={FiShoppingCart}
        h="4"
        w="7"
        alignSelf="center"
        color="white"
      />
      Achats
    </Flex>
  );
};

const links = [
  { linkName: "Nos produits", path: "/products" },
  { linkName: <ShoppingCartIcon />, path: "/cart" },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    color="white"
    to={path}
    px={2}
    py={2}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("yellow.400", "yellow.400"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Box bg={useColorModeValue("red.600", "red.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link
            as={ReactLink}
            to="/"
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Flex alignItems="center">
              <Text fontWeight="extrabold" color="white">
                <Image
                  boxSize="150px"
                  src={Logo}
                  alt="Logo"
                  color={isHovering ? "cyan.400" : "orange.800"}
                />
              </Text>
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <NavLink>
            <Icon
              cursor="pointer"
              mr="3"
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          </NavLink>
          <Button
            as={ReactLink}
            to="/login"
            p={2}
            fontSize="sm"
            fontWeight={400}
            variant="link"
            _hover={{ bg: "yellow.400" }}
            color="white"
          >
            Se connecter
          </Button>
          <Button
            as={ReactLink}
            to="/registration"
            m={2}
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight={600}
            _hover={{ bg: "yellow.400" }}
            bg="yellow.500"
            color="white"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="sign up" path="/registration">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
