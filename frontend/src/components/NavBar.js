import {Button, Flex, Text} from "@chakra-ui/react";


const NavBar = ({addCarHandler}) => {
    return (
        <Flex bg={"black"} justify={"space-between"} position="fixed" top="0rem" minH={"4.5rem"} w={"100%"}
              align="center">
            <a href={"/"}>
                <Text fontSize={"2xl"} color={"white"} ml={"2rem"}>
                    Car Dealer
                </Text>
            </a>
            <Button mr={"2rem"} colorScheme={"telegram"} onClick={() => addCarHandler()}>
                Add Cars
            </Button>
        </Flex>
    )
}
export default NavBar;
