import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addCartItem } from "../redux/actions/cartActions";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast;
  // redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product } = products;

  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id, cart]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = () => {
    dispatch(addItem(product._id, amount));
    toast({
      description: "Item has been added.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Wrap spacing="30px" justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="orange.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Nous sommes désolé!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", lg: "5xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ lg: "flex-start" }}
            >
              <Stack
                pr={{ base: "0", md: "12" }}
                spacing={{ base: "8", md: "4" }}
                flex="1.5"
                mb={{ base: "12", md: "none" }}
              >
                {product.productIsNew && (
                  <Badge
                    rounded="full"
                    w="73px"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    Nouveau
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    rounded="full"
                    w="91px"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    En rupture
                  </Badge>
                )}
                <Heading fontSize="2xl" fontWeight="extrabold">
                  {product.name}
                </Heading>
                <Stack spacing="5">
                  <Box>
                    <Text fontSize="xl">{product.price}€</Text>
                    <Flex>
                      <HStack spacing="2px">
                        <StarIcon color="orange.500" />
                        <StarIcon
                          color={
                            product.rating >= 2 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 3 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 4 ? "orange.500" : "gray.200"
                          }
                        />
                        <StarIcon
                          color={
                            product.rating >= 5 ? "orange.500" : "gray.200"
                          }
                        />
                      </HStack>
                      <Text fontSize="md" fontWeight="bold" ml="4px">
                        {product.numberOfReviews} Notes
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>
                  <Text fontWeight={"bold"}>Quantity</Text>
                  <Flex
                    w="170px"
                    p="5px"
                    border="1px"
                    borderColor="gray.200"
                    alignItems="center"
                  >
                    <Button
                      isDisabled={amount <= 1}
                      onClick={() => changeAmount("minus")}
                    >
                      <MinusIcon />
                    </Button>
                    <Text mx="30px">{amount}</Text>
                    <Button
                      isDisabled={amount >= product.stock}
                      onClick={() => changeAmount("plus")}
                    >
                      <SmallAddIcon w="20px" h="25px" />
                    </Button>
                  </Flex>
                  <Button
                    isDisabled={product.stock === 0}
                    colorScheme="orange"
                    onClick={() => addItem()}
                  >
                    Ajouter à la carte
                  </Button>
                  <Stack width="270">
                    <Flex alignItems="center">
                      <BiPackage size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Livraison gratuite si la commande est supérieure 30€
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiCheckShield size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Recette et savoir faire depuis plus de 30 ans
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <BiSupport size="20px" />
                      <Text fontWeight="medium" fontSize="sm" ml="2">
                        Vous pouvez nous contacter au 0693 45 33 64
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direction="colomn"
                alignItems="center"
                flex="1"
                _dark={{ bg: "gray.900" }}
              >
                <Image mb="30px" src={product.image} alt={product.name} />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize="xl" fontWeight="bold">
                Notes
              </Text>
              <SimpleGrid minChildWidth="300px" spacingX="40px" spacing="20px">
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing="2px" alignItems="center">
                      <StarIcon color="orange.500" />
                      <StarIcon
                        color={review.rating >= 2 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 3 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 4 ? "orange.500" : "gray.200"}
                      />
                      <StarIcon
                        color={review.rating >= 5 ? "orange.500" : "gray.200"}
                      />
                      <Text fontWeight="semibold" ml="4px">
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py="12px">{review.comment}</Box>
                    <Text fontSize="sm" color="gray.400">
                      {" "}
                      par {review.name},
                      {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
