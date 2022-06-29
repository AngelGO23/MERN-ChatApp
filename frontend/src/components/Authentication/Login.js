import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Toast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useNavigate();

    const handleClick = () => {
        setShow(!show);
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Succesful",
                status: "succes",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");

        } catch (error) {
            toast({
                title: "Error ocurred!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }

    }

    return (
        <VStack spacing='5px' color='black'>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='Password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant='solid'
                colorScheme='red'
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword('123456');
                }}>
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login