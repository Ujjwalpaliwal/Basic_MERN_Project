import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { ColorModeButton } from "./ui/color-mode";

const Navbar = () => {
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"to-r"}
                    gradientFrom={"cyan.400"}
                    gradientTo={"blue.500"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack gap={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <FiPlusSquare fontSize={20} />
                        </Button>
                    </Link>
                    <ColorModeButton />
                </HStack>
            </Flex>
        </Container>
    );
};
export default Navbar;
