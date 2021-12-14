import {
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input, Text, Box,
} from "@chakra-ui/react"
import NavBar from "./components/NavBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import CarBox from "./components/CarBox";

function App() {
    const [data, setData] = useState([]);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [error, setError] = useState({
        status: false,
        message: ""
    });

    const fetchData = async () => {
        const result = await axios("http://localhost:8080/getCar", {
            mode: 'no-cors',
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        setData(result.data)
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    const addToDb = (data) => {
        axios.post("http://localhost:8080/addCar", data, {
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (res.data.status === "success") {
                    onClose()
                    setError({
                        status: false,
                        message: ""
                    })
                    fetchData().then()
                }
            })
            .catch(err => {
                if (err.response.status) {
                    setError({
                        status: true,
                        message: err.response.data.message
                    })

                }
            });
    }

    const addCarHandler = () => {
        onOpen()
    };

    const carSchema = Yup.object().shape({
        dealerName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        dealerPinCode: Yup.string()
            .min(1, 'Too Short!')
            .max(12, 'Too Long!')
            .required('Required'),
        carModel: Yup.string()
            .min(2, 'Too Short!')
            .max(35, 'Too Long!')
            .required('Required'),
        carColor: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        carRegNum: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
    });

    return (
        <Flex minH={"100vh"} w={"100%"} bg={"gray.100"}>
            <NavBar addCarHandler={addCarHandler}/>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add Cars</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                dealerName: "",
                                dealerPinCode: "",
                                carModel: "",
                                carColor: "",
                                carRegNum: ""
                            }}
                            validationSchema={carSchema}
                            onSubmit={(values, actions) => {
                                setTimeout(async () => {
                                    await addToDb(JSON.stringify(values))
                                    actions.setSubmitting(false)
                                }, 1000)
                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name='dealerName'>
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.dealerName && form.touched.dealerName}
                                                         mb={6}>
                                                <FormLabel htmlFor='dealerName'>Dealer Name</FormLabel>
                                                <Input {...field} id='dealerName'/>
                                                <FormErrorMessage>{form.errors.dealerName}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='dealerPinCode'>
                                        {({field, form}) => (
                                            <FormControl
                                                isInvalid={form.errors.dealerPinCode && form.touched.dealerPinCode}
                                                mb={6}>
                                                <FormLabel htmlFor='dealerPinCode'>Dealer Pin Code</FormLabel>
                                                <Input {...field} id='dealerPinCode'/>
                                                <FormErrorMessage>{form.errors.dealerPinCode}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='carModel'>
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.carModel && form.touched.carModel}
                                                         mb={6}>
                                                <FormLabel htmlFor='carModel'>Car Model</FormLabel>
                                                <Input {...field} id='carModel'/>
                                                <FormErrorMessage>{form.errors.carModel}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='carColor'>
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.carColor && form.touched.carColor}
                                                         mb={6}>
                                                <FormLabel htmlFor='carColor'>Car Color</FormLabel>
                                                <Input {...field} id='carColor'/>
                                                <FormErrorMessage>{form.errors.carColor}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='carRegNum'>
                                        {({field, form}) => (
                                            <FormControl isInvalid={form.errors.carRegNum && form.touched.carRegNum}
                                                         mb={6}>
                                                <FormLabel htmlFor='carRegNum'>Car Registration Number</FormLabel>
                                                <Input {...field} id='carRegNum'/>
                                                <FormErrorMessage>{form.errors.carRegNum}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        w={"100%"}
                                        my={4}
                                        colorScheme='teal'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                    >
                                        Submit
                                    </Button>
                                    <Flex justify={"center"}>
                                        <Text fontSize={"lg"}
                                              color={"red.500"}> {error.status ? error.message : ""} </Text>
                                    </Flex>

                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Box w="100%" my={"7rem"}>
                <Flex justify="center" flexWrap="wrap" >
                    {
                        data.message===undefined ? "" :
                        data.message.map((carData,index)=>{
                            return (
                                <CarBox key={index} carData={carData} deleteCar={()=>{
                                    axios.delete(`http://localhost:8080/deleteCar/${carData._id}`).then(()=>{
                                        fetchData().then()
                                    })


                                }}  />
                            )
                        })
                    }
                </Flex>
            </Box>
        </Flex>
    );
}

export default App;
