import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            });
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
            });
        } else {
            toaster.create({
                title: "Success",
                description: "Product updated successfully",
                type: "success",
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack gap={2}>
                    <DialogRoot lazyMount>
                        <DialogTrigger asChild>
                            <IconButton aria-label='Edit product' colorPalette='blue' variant='ghost'>
                                <FiEdit />
                            </IconButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Product</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <VStack gap={4}>
                                    <Input
                                        placeholder='Product Name'
                                        name='name'
                                        value={updatedProduct.name}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                    />
                                    <Input
                                        placeholder='Price'
                                        name='price'
                                        type='number'
                                        value={updatedProduct.price}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                    />
                                    <Input
                                        placeholder='Image URL'
                                        name='image'
                                        value={updatedProduct.image}
                                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                    />
                                </VStack>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant='outline'>Cancel</Button>
                                </DialogActionTrigger>
                                <DialogActionTrigger asChild>
                                    <Button
                                        colorPalette='blue'
                                        mr={3}
                                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                    >
                                        Update
                                    </Button>
                                </DialogActionTrigger>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
                    <IconButton
                        aria-label='Delete product'
                        onClick={() => handleDeleteProduct(product._id)}
                        colorPalette='red'
                        variant='ghost'
                    >
                        <FiTrash2 />
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    );
};
export default ProductCard;
