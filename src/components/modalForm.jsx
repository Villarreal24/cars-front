import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Spacer,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { usePostNewCarMutation } from '@/store/services/carsApi';
import { setRefresh } from '@/store/adminSlice';

function ModalForm({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [postNewCar] = usePostNewCarMutation();

    // ==== INITIAL STATE OF INPUTS FORMS =====
    const initialFormState = {
        brand: '',
        model: '',
        series: '',
        year: '',
        color: '',
        category: '',
        mileage: '',
        price: '',
        details: {
            engine: '',
            hp: '',
            passengers: '',
            torque: ''
        }
    };
    const [form, setForm] = useState(initialFormState);

    // ==== FUNCTION TO SET THE VALUE OF THE INPUT ====
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // ==== FUNCTION TO SEND DATA TO ENDPOINT TO SAVE DATA ON DB =====
    const handleSubmit = (e) => {
        e.preventDefault();
        // ==== CREATE OBJECT WITH THE REQUIRED STRUCTURE =====
        const object = {
            brand: form.brand,
            model: form.model,
            series: form.series,
            year: form.year,
            color: form.color,
            category: form.category,
            mileage: form.mileage,
            price: form.price,
            details: {
                engine: form.engine,
                hp: form.hp,
                passengers: form.passengers,
                torque: form.torque
            }
        }

        postNewCar(object).then(resp => {
            console.log(resp)
            if (resp.data) {
                console.log("Agregado exitosamente");
                onClose();
                dispatch(setRefresh(true));
                setForm(initialFormState);
                toast({
                    title: 'Add succesfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                console.log("Valio barriga")
                toast({
                    title: 'Failed, try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        })
            .catch((err) => {
                console.log("Error: ", err);
                toast({
                    title: 'Failed, try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size='2xl'
        >
            <ModalOverlay />
            <ModalContent bg='#171717'>
                <ModalHeader>Fill the form</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <VStack spacing='5px' align='stretch'>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Brand</FormLabel>
                                    <Input
                                        placeholder='Example: Ford'
                                        name='brand'
                                        ref={initialRef}
                                        value={form.brand}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Model</FormLabel>
                                    <Input
                                        placeholder='Example: Mustang'
                                        name='model'
                                        value={form.model}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Series</FormLabel>
                                    <Input
                                        placeholder='Example: GT'
                                        name='series'
                                        value={form.series}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Year</FormLabel>
                                    <Input
                                        placeholder='Example: 2017'
                                        name='year'
                                        value={form.year}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Color</FormLabel>
                                    <Input
                                        placeholder='Example: Gray'
                                        name='color'
                                        value={form.color}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Category</FormLabel>
                                    <Input
                                        placeholder='Example: Coupe'
                                        name='category'
                                        value={form.category}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Mileage</FormLabel>
                                    <Input
                                        placeholder='Only numbers'
                                        type='number'
                                        name='mileage'
                                        value={form.mileage}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Price</FormLabel>
                                    <Input
                                        placeholder='Only numbers'
                                        type='number'
                                        name='price'
                                        value={form.price}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Engine</FormLabel>
                                    <Input
                                        placeholder='Example: 6.2L V8'
                                        name='engine'
                                        value={form.engine}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Power (HP)</FormLabel>
                                    <Input
                                        placeholder='Horse power'
                                        type='number'
                                        name='hp'
                                        value={form.hp}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex display={{ base: 'block', sm: 'flex' }}>
                                <FormControl
                                    mr={{ base: 0, sm: 2 }}
                                    mb={{ base: 4 }}
                                    isRequired
                                >
                                    <FormLabel>Passengers</FormLabel>
                                    <Input
                                        placeholder='Number of passengers'
                                        type='number'
                                        name='passengers'
                                        value={form.passengers}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                                <Spacer />
                                <FormControl
                                    ml={{ base: 0, sm: 2 }}
                                    isRequired
                                >
                                    <FormLabel>Torque</FormLabel>
                                    <Input
                                        placeholder='Torque of engine'
                                        type='number'
                                        name='torque'
                                        value={form.torque}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            type="submit"
                        >
                            Add
                        </Button>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ModalForm