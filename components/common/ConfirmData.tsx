import { BlurView } from "expo-blur"
import { HStack, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { Trip } from "../../features/tripSlice"

export interface IConfirmData {
    data?: Trip
    isOpen: boolean
    setIsOpen: any
    handle: any
    setLoading?: any
}

export const ConfirmData = ({
    data,
    isOpen,
    setIsOpen,
    handle,
    setLoading,
}: IConfirmData) => {
    return (
        <BlurView
            intensity={60}
            tint="dark"
            style={{
                display: isOpen ? "flex" : "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <VStack
                space={3}
                p={3}
                w={"90%"}
                bg={"white"}
                borderRadius={"10px"}
            >
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        Confirm data
                    </Text>
                    <Icon
                        onPress={() => {
                            setIsOpen(false)
                        }}
                        style={{
                            fontSize: 25,
                            color: "black",
                        }}
                        name="close-outline"
                    ></Icon>
                </HStack>
                <VStack space={3}>
                    {data && (
                        <>
                            <HStack space={3} alignItems={"center"}>
                                <Text fontSize={"16px"} w={"100px"}>
                                    name :
                                </Text>
                                <Text
                                    fontSize={"16px"}
                                    bg={"#D2DAFF"}
                                    py={1}
                                    px={2}
                                    borderRadius={4}
                                    flex={1}
                                >
                                    {data.name}
                                </Text>
                            </HStack>
                            <HStack space={3} alignItems={"center"}>
                                <Text fontSize={"16px"} w={"100px"}>
                                    Destination :
                                </Text>
                                <Text
                                    fontSize={"16px"}
                                    bg={"#D2DAFF"}
                                    py={1}
                                    px={2}
                                    borderRadius={4}
                                    flex={1}
                                >
                                    {data.destination}
                                </Text>
                            </HStack>
                            <HStack space={3} alignItems={"center"}>
                                <Text fontSize={"16px"} w={"100px"}>
                                    Description :
                                </Text>
                                <Text
                                    fontSize={"16px"}
                                    bg={"#D2DAFF"}
                                    py={1}
                                    px={2}
                                    borderRadius={4}
                                    flex={1}
                                >
                                    {data.description}
                                </Text>
                            </HStack>
                            <HStack space={3} alignItems={"center"}>
                                <Text fontSize={"16px"} w={"100px"}>
                                    Date :
                                </Text>
                                <Text
                                    fontSize={"16px"}
                                    bg={"#D2DAFF"}
                                    py={1}
                                    px={2}
                                    borderRadius={4}
                                    flex={1}
                                >
                                    {data.date}
                                </Text>
                            </HStack>
                            <HStack space={3} alignItems={"center"}>
                                <Text fontSize={"16px"} w={"100px"}>
                                    Dangerous :
                                </Text>
                                <Text
                                    fontSize={"16px"}
                                    bg={"#D2DAFF"}
                                    py={1}
                                    px={2}
                                    borderRadius={4}
                                    flex={1}
                                >
                                    {data.isRisk ? "Yes" : "No"}
                                </Text>
                            </HStack>
                        </>
                    )}
                </VStack>
                <HStack mt={"5px"} space={4} justifyContent={"space-between"}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(false)
                        }}
                        style={{
                            backgroundColor: "#AAAAAA",
                            borderRadius: 8,
                            padding: 8,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            minWidth: "47.5%",
                            shadowColor: "#00",
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}
                    >
                        <Text
                            fontSize={"16px"}
                            color={"white"}
                            textAlign={"center"}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => {
                            if(setLoading) {
                                setLoading(true)
                            }
                        }}
                        onPressOut={handle}
                        style={{
                            minWidth: "47.5%",
                            backgroundColor: "#FF6F6F",
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
                        }}
                    >
                        <Text
                            fontSize={"16px"}
                            color={"white"}
                            textAlign={"center"}
                        >
                            OK
                        </Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </BlurView>
    )
}
