import { Box, HStack, Text, VStack } from "native-base"
import { Image, SafeAreaView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import {useEffect} from 'react'
import { auth } from "../utils/dbHelper"

export const IntroScreen = ({ navigation }: { navigation: any }) => {
    useEffect(()=> {
        if(auth.currentUser) {
            navigation.navigate('Trips')
        }
    }, [auth])

    return (
        <SafeAreaView>
            <VStack
                space={8}
                alignItems={"center"}
                h={"full"}
                mt={"20px"}
                p={"20px"}
            >
                <Box
                    position={"relative"}
                    bg={"#AAC4FF"}
                    w={"full"}
                    h={"50%"}
                    borderRadius={12}
                >
                    <Image
                        source={require("../assets/CLOTHE.png")}
                        style={{
                            position: "absolute",
                            top: 20,
                            left: 20,
                        }}
                    />
                    <Image
                        source={require("../assets/ID.png")}
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: 20,
                        }}
                    />
                    <Image
                        source={require("../assets/MAP.png")}
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                        }}
                    />
                    <Image
                        source={require("../assets/SHOOTING.png")}
                        style={{
                            position: "absolute",
                            top: 100,
                            left: 100,
                        }}
                    />
                    <Image
                        source={require("../assets/SUITCASE.png")}
                        style={{
                            position: "absolute",
                            bottom: 40,
                            right: 30,
                        }}
                    />
                </Box>
                <VStack space={2} alignItems={"center"}>
                    <Text
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        w={"220px"}
                        textAlign={"center"}
                    >
                        Managing your money with this app
                    </Text>
                    <Text color={"gray.500"} textAlign={"center"} w={"260px"}>
                        hay cung chung to i lam viec o day hay cung chung to i
                        lam viec o day hay cung chung to i lam viec o day
                    </Text>
                </VStack>
                <HStack px={8} space={5} w={"full"}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text
                            style={{
                                backgroundColor: "#E1E1E1",
                                paddingVertical: 10,
                                width: 150,
                                textAlign: "center",
                                fontSize: 16,
                                borderRadius: 8,
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text
                            style={{
                                backgroundColor: "#B1B2FF",
                                paddingVertical: 10,
                                width: 150,
                                textAlign: "center",
                                fontSize: 16,
                                borderRadius: 8,
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </SafeAreaView>
    )
}