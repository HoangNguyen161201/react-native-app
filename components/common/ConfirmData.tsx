import { BlurView } from "expo-blur"
import { HStack, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { Trip } from "../../features/tripSlice"
import ItemConfirmData from "./ItemConfirmData"

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
                            <ItemConfirmData label="Name: " value={data.name}/>
                            <ItemConfirmData label="Destination: " value={data.destination}/>
                            <ItemConfirmData label="Description: " value={data.description}/>
                            <ItemConfirmData label="Date: " value={data.date}/>
                            <ItemConfirmData label="Member: " value={data.memberCount}/>
                            <ItemConfirmData label="Amount: " value={data.predictedAmount}/>
                            <ItemConfirmData label="Dangerous: " value={data.isRisk ? "Yes" : "No"}/>
                       
                         
                           
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
