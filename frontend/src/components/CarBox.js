import {Button, Flex, Text, Box, Divider} from "@chakra-ui/react";


const CarBox = ({
    deleteCar,carData
                }) => {
    return (
        <Box
            m={2}
            borderWidth="1px"
            borderRadius="1rem"
            overflow="hidden"
            bgColor="white"
        >
            <Flex align="center" mt={2} h="28rem" w="18rem" direction="column">
                <Box w="75%">
                    <Text fontSize="lg" fontWeight={600} mt={2}>
                        Dealer Name
                    </Text>
                    <Text>{carData.dealerName}</Text>
                    <Divider mb={5} />
                    <Text fontSize="lg" fontWeight={600} mt={2}>
                        Dealer Pin Code
                    </Text>
                    <Text>{carData.dealerPinCode}</Text>
                    <Divider mb={5} />
                    <Text fontSize="lg" fontWeight={600} mt={2}>
                        Car Model
                    </Text>
                    <Text>{carData.carModel}</Text>
                    <Divider mb={5} />
                    <Text fontSize="lg" fontWeight={600} mt={2}>
                        Car Color
                    </Text>
                    <Text>{carData.carColor}</Text>
                    <Divider mb={5} />
                    <Text fontSize="lg" fontWeight={600} mt={2}>
                        Car Registration Number
                    </Text>
                    <Text>{carData.carRegNum}</Text>
                </Box>
                    <Box h={55} my={5}>
                        <Button colorScheme="red" variant="solid" onClick={()=>{
                            deleteCar()
                        }}>
                            Delete
                        </Button>
                    </Box>
            </Flex>
        </Box>
    )
}
export default CarBox;
