import { BlurView } from "expo-blur"
import { HStack, Text, VStack } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from 'react-native-vector-icons/Ionicons'
import { setDateOrTime } from "../../utils/DateTimeHelper"
import { DialogAddExpense as IDialogAddExpense } from "../../utils/interfaces"
import { Input } from "./Input"
import { Select } from "./Select"

export const DialogAddExpense = ({isOpen, form, setIsOpen, submit}: IDialogAddExpense) => {
    const {handleSubmit } = form
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
                bg={"white"}
                borderRadius={"15px"}
                w={"90%"}
            >
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        Add expense
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
                <VStack space={2}>
                    <HStack space={4}>
                        <Input
                            required
                            isNumber
                            iconName="cash-outline"
                            form={form}
                            name={"amount"}
                            placeholder={"Enter Amount"}
                            flex={1}
                            label={"Amount"}
                        />
                        <Select
                            flex={1}
                            form={form}
                            name={"type"}
                            label={"Type"}
                            options={["Travel", "Food", "Other"]}
                        />
                    </HStack>
                    <HStack space={4}>
                        <Input
                            required
                            handle={() => {
                                setDateOrTime({
                                    form,
                                    mode: "date",
                                    nameField: "date",
                                })
                            }}
                            iconName="calendar-outline"
                            form={form}
                            name={"date"}
                            placeholder={"Enter date"}
                            flex={1}
                            label={"Date"}
                        />
                        <Input
                            required
                            handle={() => {
                                setDateOrTime({
                                    mode: "time",
                                    form,
                                    nameField: "time",
                                })
                            }}
                            flex={1}
                            iconName="time-outline"
                            form={form}
                            name={"time"}
                            placeholder={"Enter time"}
                            label={"Time"}
                        />
                    </HStack>
                    <Input
                        iconName="document-text-outline"
                        form={form}
                        name={"comment"}
                        placeholder={"Enter comment"}
                        label={"Comment"}
                    />
                    <Input
                        iconName="document-text-outline"
                        form={form}
                        name={"address"}
                        placeholder={"Enter address"}
                        label={"Address"}
                    />
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
                        onPress={handleSubmit(submit)}
                        style={{
                            minWidth: "47.5%",
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
                        <Text
                            fontSize={"16px"}
                            color={"white"}
                            textAlign={"center"}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </BlurView>
    )
}
