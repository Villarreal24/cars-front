import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetSpecificationsQuery } from "@/store/services/carsApi";
import { useSelector, useDispatch } from "react-redux";

function ModalDetails({ isOpen, onClose }) {
    const id = useSelector(state => state.admin.idSelected);
    const { data, isError, isLoading } = useGetSpecificationsQuery(id);

    // ==== FUNCTION TO RETURN TEXT WITH THE FIRST LETTER CAPITALIZE ====
    const capitalizeFirstLetter = (payload) => {
        if (payload) {
            return ' ' + payload.charAt(0).toUpperCase() + payload.slice(1);
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
        return ' ' + payload + ' USD'
    }

    // ==== FUNCTION TO FORMAT NUMBER MILES ====
    const formatMiles = (payload) => {
        const formattedNumber = payload.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return ' ' + formattedNumber + ' (mi)'
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg='#171717'>
                <ModalHeader>All information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {!isLoading && data ? (
                        <Box>
                            <Text
                                mb={3}
                                fontSize='lg'
                                fontWeight='700'
                            >
                                Basic data
                            </Text>
                            <VStack
                                mb={10}
                                spacing='12px'
                                align='flex-start'
                                fontSize='15px'
                            >
                                <Text>Brand:
                                    {capitalizeFirstLetter(data.brand)}
                                </Text>
                                <Text>Model:
                                    {capitalizeFirstLetter(data.model)}
                                </Text>
                                <Text>Series:
                                    {capitalizeFirstLetter(data.series)}
                                </Text>
                                <Text>Year:
                                    {capitalizeFirstLetter(data.year)}
                                </Text>
                                <Text>Color:
                                    {capitalizeFirstLetter(data.color)}
                                </Text>
                                <Text>Category:
                                    {capitalizeFirstLetter(data.category)}
                                </Text>
                                <Text>Miles:
                                    {formatMiles(data.mileage)}
                                </Text>
                                <Text>Price:
                                    {formatPrice(data.price)}
                                </Text>
                            </VStack>

                            <Text my={3} fontSize='lg' fontWeight='700'>
                                Details
                            </Text>
                            <VStack
                                spacing='12px'
                                align='flex-start'
                                fontSize='15px'
                            >
                                <Text>
                                    Engine: {data.details.engine}
                                </Text>
                                <Text>
                                    Power: {data.details.hp} HP
                                </Text><Text>
                                    Passengers: {data.details.passengers}
                                </Text><Text>
                                    Torque: {data.details.torque} lb-ft
                                </Text>
                            </VStack>
                        </Box>
                    ) : <Text>Cargando ...</Text>}
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalDetails