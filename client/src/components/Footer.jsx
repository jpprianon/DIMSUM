import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <Box w="100%" bg={useColorModeValue("gray.300", "gray.900")}>
    <Container as="footer" role="contentinfo" maxW="7xl">
      <Stack
        spacing="8"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        py={{ base: "12", md: "16" }}
      >
        <Stack spacing={{ base: "6", md: "8" }} align="start">
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="extrabold">
              Bouchons Maison
            </Text>
          </Flex>
          <Text color="muted">Bouchon lé bon.</Text>
        </Stack>
        <Stack
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "12", md: "8" }}
        >
          <Stack direction="row" spacing="8">
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Produits
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Fonctionnement</Button>
                <Button variant="link">Tarifs</Button>
              </Stack>
            </Stack>
            <Stack spacing="4" minW="36" flex="1">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Légale
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                <Button variant="link">Confidentialité</Button>
                <Button variant="link">Termes</Button>
                <Button variant="link">License</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Tenez vous à jour
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", sm: "row" }}
              maxW={{ lg: "360px" }}
            >
              <Input placeholder="Enter votre email" type="email" required />
              <Button variant="primary" type="submit" flexShrink={0}>
                S'abonner
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Bouchons Maison reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
