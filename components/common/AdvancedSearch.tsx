import { BlurView } from "expo-blur"
import { HStack, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { Input } from "."
import { setDateOrTime } from "../../utils/DateTimeHelper"
import { DialogSearch } from "../../utils/interfaces"

export const AdvancedSearch = ({
    isOpen,
    setIsOpen,
    handle,
    form,
}: DialogSearch) => {
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
                justifyContent: "center",
                alignItems: "center",
                display: isOpen ? "flex" : "none",
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
                        Advanced search
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
                    <Input
                        form={form}
                        label={"Name"}
                        placeholder={"Enter trip name"}
                        iconName={"golf-outline"}
                        name={"name"}
                    />
                    <Input
                        form={form}
                        label={"Destination"}
                        placeholder={"Enter trip destination"}
                        iconName={"location-outline"}
                        name={"destination"}
                    />
                    <HStack space={4}>
                        <Input
                            flex={1}
                            handle={() => {
                                setDateOrTime({
                                    mode: "date",
                                    nameField: "startDate",
                                    form,
                                })
                            }}
                            form={form}
                            label={"Start date"}
                            placeholder={"Enter start date"}
                            iconName={"calendar-outline"}
                            name={"startDate"}
                        />
                        <Input
                            handle={() => {
                                setDateOrTime({
                                    mode: "date",
                                    nameField: "endDate",
                                    form,
                                })
                            }}
                            flex={1}
                            form={form}
                            label={"End date"}
                            placeholder={"Enter end date"}
                            iconName={"calendar-outline"}
                            name={"endDate"}
                        />
                    </HStack>
                </VStack>

                <TouchableOpacity
                    onPress={() => handle()}
                    style={{
                        marginTop: 5,
                        width: "100%",
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
                    }}
                >
                    <Text fontSize={"16px"} textAlign={"center"}>
                        OK
                    </Text>
                </TouchableOpacity>
            </VStack>
        </BlurView>
    )
}
