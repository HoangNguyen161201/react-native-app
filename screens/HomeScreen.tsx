import { Box, HStack, Text, VStack } from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import Layout from "../components/layouts/Layout"

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <Layout navigation={navigation} bg={"white"}>
            <VStack p={"20px"} space={4} h={"full"}>
                <VStack space={3}>
                    <HStack
                        w={"full"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text
                            fontSize={"lg"}
                            fontWeight={"bold"}
                            color={"gray.400"}
                        >
                            Trips
                        </Text>
                        <Icon size={20} name="arrow-forward-outline"></Icon>
                    </HStack>
                    <Box bg={"red.500"} w={"full"} h={'500px'}></Box>
                </VStack>
                <VStack space={3}>
                    <Text
                        fontSize={"lg"}
                        fontWeight={"bold"}
                        color={"gray.400"}
                    >
                        Features
                    </Text>
                    <VStack space={4} w={"full"}>
                        <HStack space={4} w={"full"}>
                            <VStack
                                bg={"#FF8888"}
                                py={3}
                                flex={1}
                                borderRadius={10}
                                space={2}
                                alignItems={"center"}
                            >
                                <Icon
                                    size={25}
                                    name="cloud-upload-outline"
                                ></Icon>
                                <Text
                                    fontSize={"16px"}
                                    w={"full"}
                                    textAlign={"center"}
                                >
                                    Backup
                                </Text>
                            </VStack>
                            <VStack
                                bg={"#AAC4FF"}
                                py={3}
                                flex={1}
                                borderRadius={10}
                                space={2}
                                alignItems={"center"}
                            >
                                <Icon
                                    size={25}
                                    name="cloud-upload-outline"
                                ></Icon>
                                <Text
                                    fontSize={"16px"}
                                    w={"full"}
                                    textAlign={"center"}
                                >
                                    Backup
                                </Text>
                            </VStack>
                        </HStack>
                        <HStack space={4} w={"full"}>
                            <VStack
                                bg={"#C7F8C3"}
                                py={3}
                                flex={1}
                                borderRadius={10}
                                space={2}
                                alignItems={"center"}
                            >
                                <Icon
                                    size={25}
                                    name="cloud-upload-outline"
                                ></Icon>
                                <Text
                                    fontSize={"16px"}
                                    w={"full"}
                                    textAlign={"center"}
                                >
                                    Backup
                                </Text>
                            </VStack>
                            <VStack
                                bg={"#FFDE6A"}
                                py={3}
                                flex={1}
                                borderRadius={10}
                                space={2}
                                alignItems={"center"}
                            >
                                <Icon
                                    size={25}
                                    name="cloud-upload-outline"
                                ></Icon>
                                <Text
                                    fontSize={"16px"}
                                    w={"full"}
                                    textAlign={"center"}
                                >
                                    Backup
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        </Layout>
    )
}
