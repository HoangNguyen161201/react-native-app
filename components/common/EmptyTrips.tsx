import { Box, HStack, Image, Text } from "native-base"
import { TouchableOpacity } from "react-native"

export const EmptyTrips = ({navigation}: {navigation: any}) => {
    return (
        <Box>
            <Image
                source={require("../../assets/empty.png")}
                style={{
                    opacity: 0.5,
                    marginTop: -60,
                    transform: [
                        {
                            scale: 0.6,
                        },
                    ],
                }}
            />

            <Text
                textAlign={"center"}
                mt={-10}
                color={"gray.400"}
                fontSize={"16px"}
            >
                Data empty, add a new trip
            </Text>
            <HStack mt={3} justifyContent={"center"}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Add new")
                    }}
                    style={{
                        backgroundColor: "#B1B2FF",
                        borderRadius: 8,
                        padding: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowColor: "#00",
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        width: 80,
                    }}
                >
                    <Text
                        fontSize={"16px"}
                        color={"white"}
                        textAlign={"center"}
                    >
                        Add new
                    </Text>
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
