import { BlurView } from "expo-blur"
import { HStack, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { AlertDialog as IAlertDialog } from "../../utils/interfaces"

export const AlertDialog = ({
    isOpen,
    setIsOpen,
    handle,
    title,
    description,
}: IAlertDialog) => {
    return (
        <BlurView
            intensity={60}
            tint="dark"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: isOpen ? "flex" : "none",
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
                        {title}
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
                <Text color={"gray.500"}>{description}</Text>
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
                        onPress={handle}
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