"use client";

import { useEffect } from 'react';
import {
    Container,
    Box,
    Flex,
    Stack,
    Center,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    useDisclosure,
    Show,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetCarsQuery } from '@/store/services/carsApi';
import ModalForm from '@/components/modalForm';
import ModalDetails from '@/components/modalDetails';
import { setIdSeleted, setRefresh } from '@/store/adminSlice';

function Admin() {
    const dispatch = useDispatch();
    const refresh = useSelector(state => state.admin.refresh);

    // ==== INSTANCE OF MODAL FORM ====
    const {
        isOpen: isOpenForm,
        onOpen: onOpenForm,
        onClose: onCloseForm
    } = useDisclosure();
    // ==== INSTANCE OF MODAL DETAILS ====
    const {
        isOpen: isOpenDetails,
        onOpen: onOpenDetails,
        onClose: onCloseDetails
    } = useDisclosure();
    const { data, isError, isLoading, refetch } = useGetCarsQuery();

    // ==== USE EFFECT TO REFRESH DATA AFTER ADD NEW REGISTRY =====
    useEffect(() => {
        if (refresh) {
            refetch();
            setTimeout(() => {
                dispatch(setRefresh(false));
            }, 1000);
        }
    }, [refresh]);

    // ==== FUNCTION TO RETURN TEXT WITH THE FIRST LETTER CAPITALIZE ====
    const capitalizeFirstLetter = (payload) => {
        if (payload) {
            return payload.charAt(0).toUpperCase() + payload.slice(1);
        } else {
            return payload
        }
    }

    // ==== FUNCTION TO RETURN THE PRICE FORMATTED ====
    const formatPrice = (payload) => {
        payload = Intl.NumberFormat('es-MX',
            {
                style: 'currency',
                currency: 'MXN',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(payload);
        return payload + ' USD'
    }

    // ==== FUNCTION TO OPEN MODAL DETAILS AND SEND ID SELECTED ====
    const handleDetails = (id) => {
        dispatch(setIdSeleted(id))
        onOpenDetails()
    }

    return (
        <Container
            maxW='7xl'
            py={14}
            px={{ base: 5, sm: 10 }}
        >
            {/* ===== IMPORT MODAL FORM COMPONENTE ===== */}
            {isOpenDetails ? (
                <ModalDetails
                    isOpen={isOpenDetails}
                    onClose={onCloseDetails}
                />
            ) : null}

            {/* ===== IMPORT MODAL FORM COMPONENTE ===== */}
            <ModalForm
                isOpen={isOpenForm}
                onClose={onCloseForm}
            />

            <Flex mb={6}>
                <Text
                    my='auto'
                    mr={5}
                    fontSize='xl'
                    fontWeight='500'
                >
                    Add new registry:
                </Text>
                <Button
                    colorScheme='teal'
                    fontSize='lg'
                    onClick={() => onOpenForm()}
                >
                    Add car
                </Button>
            </Flex>

            {!isLoading && data ? (
                <>
                    {/* ==== TABLE FOR DESKTOP ==== */}
                    <Show above='md'>
                        <TableContainer>
                            <Table
                                variant='simple'
                                size={{ base: 'xs', lg: 'sm', xl: 'md' }}
                            >
                                <TableCaption>
                                    List general of all cars
                                </TableCaption>
                                <Thead bg='gray.700'>
                                    <Tr>
                                        <Th color='white'>Brand</Th>
                                        <Th color='white'>Model</Th>
                                        <Th color='white'>Series</Th>
                                        <Th color='white'>Year</Th>
                                        <Th color='white'>Color</Th>
                                        <Th isNumeric color='white'>Price</Th>
                                        <Th isNumeric color='white'>Details</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>{capitalizeFirstLetter(item.brand)}</Td>
                                            <Td>{capitalizeFirstLetter(item.model)}</Td>
                                            <Td>{capitalizeFirstLetter(item.series)}</Td>
                                            <Td>{item.year}</Td>
                                            <Td>{capitalizeFirstLetter(item.color)}</Td>
                                            <Td isNumeric>{formatPrice(item.price)}</Td>
                                            <Td>
                                                <Stack align='flex-end'>
                                                    <Button
                                                        size='sm'
                                                        onClick={() => handleDetails(item._id)}
                                                    >
                                                        Show
                                                    </Button>
                                                </Stack>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Show>

                    {/* ==== DATA OF CARS FOR MOBILE ==== */}
                    <Show below='md'>
                        <Accordion allowToggle>
                            {data.map((item, index) => (
                                <AccordionItem key={index} fontSize='lg'>
                                    <h2>
                                        <AccordionButton>
                                            <Box
                                                as="span"
                                                flex='1'
                                                textAlign='left'
                                            >
                                                <Text
                                                    fontSize='xl'
                                                    fontWeight='600'
                                                >
                                                    {capitalizeFirstLetter(
                                                        `${item.brand}
                                                        ${item.model}
                                                        ${item.series}`
                                                    )}
                                                </Text>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Text>
                                            <strong>Year: </strong>
                                            {item.year}
                                        </Text>
                                        <Text>
                                            <strong>Color: </strong>
                                            {capitalizeFirstLetter(item.color)}
                                        </Text>
                                        <Text>
                                            <strong>Price: </strong>
                                            {formatPrice(item.price)}
                                        </Text>

                                        <Stack align='flex-end'>
                                            <Button
                                                size='sm'
                                                onClick={() => handleDetails(item._id)}
                                            >
                                                Details
                                            </Button>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Show>
                </>
            ) : (
                <Center h='40vh'>
                    <Stack align='center'>
                        <Text mb={5} fontSize='lg'>Cargando</Text>
                        <Spinner size='xl' />
                    </Stack>
                </Center>
            )}
            {isError ? (
                <Text fontSize='xl' fontWeight='600' color='orange'>
                    Oh, Something happend, verify your internet
                    connection and try again
                </Text>
            ) : null}
        </Container>
    )
}

export default Admin