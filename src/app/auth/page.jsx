"use client";

import {
    Text,
    Stack,
    Card,
    CardBody,
    Center,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import {
    usePostRegisterUserMutation,
    usePostLoginMutation
} from "@/store/services/carsApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

function Register() {
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [postRegistry] = usePostRegisterUserMutation();
    const [postLogin] = usePostLoginMutation();

    // ==== INITIAL STATE OF INPUTS FORMS =====
    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    const [form, setForm] = useState(initialFormState);

    // ==== FUNCTION TO SET THE VALUE OF THE INPUT ====
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postRegistry(form).then(resp => {
            console.log(resp)
            if (resp.data) {
                setIsLogin(!isLogin)
                toast({
                    title: 'User created',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Something fail, try again later',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        })
            .catch(err => {
                console.log("Error: ", err)
                toast({
                    title: 'Something fail, try again later',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        postLogin(form).then(resp => {
            console.log(resp)
            if (resp.data) {
                dispatch(setUser(form));
                toast({
                    title: 'Logged successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                router.push('/')
            } else {
                toast({
                    title: 'Email or password invalid',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        })
            .catch(err => {
                console.log("Error: ", err)
                toast({
                    title: 'Failed, try again.',
                    description: err,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            })
    }

    return (
        <Container maxW='2xl'>
            <Center h='100vh'>
                <Card
                    w='60vh'
                    p={5}
                    bg='#171717'
                    color='white'
                >
                    {!isLogin ? (
                        <CardBody>
                            <Text
                                mb={10}
                                textAlign='center'
                                fontSize='2xl'
                                fontWeight='700'
                            >
                                Sign Up
                            </Text>
                            <form onSubmit={handleSubmit}>
                                <VStack spacing='20px'>
                                    <FormControl isRequired>
                                        <FormLabel>First name</FormLabel>
                                        <Input
                                            placeholder="First name"
                                            name='firstName'
                                            type='text'
                                            value={form.firstName}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Last name</FormLabel>
                                        <Input
                                            placeholder="Last name"
                                            name='lastName'
                                            type='text'
                                            value={form.lastName}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="ejemplo@gmail.com"
                                            name='email'
                                            type='email'
                                            value={form.email}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            placeholder="*******"
                                            name='password'
                                            type='password'
                                            minLength={6}
                                            value={form.password}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                </VStack>
                                <Stack mt={7} align='center'>
                                    <Text
                                        as='u'
                                        color='teal.300'
                                        fontSize='14px'
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        You already have account?
                                    </Text>
                                </Stack>
                                <Stack mt={8} align='center'>
                                    <Button
                                        type="submit"
                                        colorScheme='blue'
                                    >
                                        Send
                                    </Button>
                                </Stack>
                            </form>
                        </CardBody>
                    ) : (
                        <CardBody>
                            <Text
                                mb={10}
                                textAlign='center'
                                fontSize='2xl'
                                fontWeight='700'
                            >
                                Sign in
                            </Text>
                            <form onSubmit={handleLogin}>
                                <VStack spacing='20px'>
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="ejemplo@gmail.com"
                                            name='email'
                                            type='email'
                                            value={form.email}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            placeholder="*******"
                                            name='password'
                                            type='password'
                                            value={form.password}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </FormControl>
                                </VStack>
                                <Stack mt={7} align='center'>
                                    <Text
                                        as='u'
                                        color='teal.300'
                                        fontSize='14px'
                                        _hover={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        You don't have account?
                                    </Text>
                                </Stack>
                                <Stack mt={8} align='center'>
                                    <Button
                                        type="submit"
                                        colorScheme='blue'
                                    >
                                        Send
                                    </Button>
                                </Stack>
                            </form>
                        </CardBody>
                    )}
                </Card>
            </Center>
        </Container>
    )
}

export default Register