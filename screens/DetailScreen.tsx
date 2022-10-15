import AsyncStorage from "@react-native-async-storage/async-storage"
import { BlurView } from "expo-blur"
import { Box, HStack, Text, useToast, VStack } from "native-base"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Animated, Image } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import uuid from "react-native-uuid"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
    Alert,
    AlertDialog,
    FieldItemTrip,
    Input,
    ItemExpense,
    Loading,
    Select
} from "../components/common"
import Layout from "../components/layouts/Layout"
import { addExpense, deleteExpenses, IExpense } from "../features/expenseSlice"
import { deleteTrip } from "../features/tripSlice"
import { setDateOrTime } from "../utils/DateTimeHelper"

export const DetailScreen = ({ navigation }: { navigation: any }) => {
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [expensesById, setExpenseById] = useState<Array<IExpense>>()
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const trip = useAppSelector((state) => state.tripsReducer.tripSelected)
    const [openExpensesList, setOpenExpensesList] = useState(false)
    const fadeAnimate = useRef(new Animated.Value(0)).current
    const [isOpenAddExpense, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()
    const expenses = useAppSelector((state) => state.expensesReducer.data)

    useEffect(() => {
        if (expenses && trip) {
            setExpenseById(
                expenses.filter((expense) => expense.idTrip == trip.id)
            )
        }
    }, [expenses])

    const defaultValues = useMemo<IExpense>(() => {
        return {
            amount: 0,
            comment: "",
            date: "",
            time: "",
            type: "Travel",
            id: "",
            idTrip: "",
        }
    }, [])

    const form = useForm<IExpense>({
        defaultValues,
    })

    const { handleSubmit } = form

    const submit = async (value: IExpense) => {
        setIsLoading(true)
        const data = [...expenses]
        value.id = uuid.v4()
        if (trip?.id) {
            value.idTrip = trip?.id
        }
        data.push(value)
        await AsyncStorage.setItem("expenses", JSON.stringify(data))
        dispatch(addExpense(value))
        form.reset(defaultValues)
        toast.show({
            render: () => {
                return (
                    <Alert
                        type={"success"}
                        message={"Add new expense successfully"}
                    />
                )
            },
        })
        setIsLoading(false)
    }

    useEffect(() => {
        Animated.timing(fadeAnimate, {
            toValue: openExpensesList ? 400 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }, [openExpensesList])

    const handleDelete = () => {
        setIsOpenAlert(false)
        if (trip) {
            dispatch(deleteExpenses(trip.id))
            dispatch(deleteTrip(trip.id))
        }
        toast.show({
            render: () => {
                return (
                    <Alert
                        type={"success"}
                        message={"Delete trip successfully"}
                    />
                )
            },
        })
        navigation.navigate("Trips")
    }

    return (
        <Layout navigation={navigation} bg={"white"}>
            <ScrollView>
                <Box p={"20px"}>
                    <VStack mb={5} space={0}>
                        <HStack alignItems={"center"} space={3}>
                            <Text fontSize={"20px"} fontWeight={"semibold"}>
                                {trip?.name}
                            </Text>
                            <Icon
                                onPress={() => {
                                    navigation.navigate("Update")
                                }}
                                style={{
                                    fontSize: 20,
                                }}
                                name="open-outline"
                            ></Icon>
                        </HStack>
                        <Text fontSize={"14px"} color={"gray.400"}>
                            {trip?.description}
                        </Text>
                    </VStack>
                    <Box
                        overflow={"hidden"}
                        borderWidth={1}
                        borderColor={"#7E80FF"}
                        marginBottom={22}
                        height={150}
                        borderRadius={10}
                    >
                        {trip && (
                            <Image
                                source={
                                    trip.img == "../assets/trip.png"
                                        ? require("../assets/trip.png")
                                        : {
                                              uri: trip.img,
                                          }
                                }
                                style={{
                                    width: "100%",
                                    borderWidth: 4,
                                    height: 150,
                                }}
                            />
                        )}
                    </Box>

                    <VStack space={3} mb={5}>
                        <FieldItemTrip
                            text={trip?.destination}
                            iconName="location-outline"
                        />
                        <FieldItemTrip
                            text={trip?.date}
                            iconName="calendar-outline"
                        />
                        <FieldItemTrip
                            text={trip?.isRisk ? "Yes" : "No"}
                            iconName="alert-circle-outline"
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setOpenExpensesList((state) => !state)
                            }}
                        >
                            <HStack
                                alignItems={"center"}
                                justifyContent="space-between"
                            >
                                <FieldItemTrip
                                    text={"Expenses"}
                                    iconName="cash-outline"
                                />
                                <HStack>
                                    <Icon
                                        style={{
                                            fontSize: 17,
                                            color: "gray",
                                        }}
                                        name={`chevron-${
                                            openExpensesList ? "up" : "down"
                                        }-outline`}
                                    ></Icon>
                                </HStack>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>
                    <Animated.View
                        style={{
                            maxHeight: fadeAnimate,
                            overflow: "scroll",
                        }}
                    >
                        <ScrollView>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsOpen(true)
                                }}
                                style={{
                                    marginBottom: 20,
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
                                    Add new expense
                                </Text>
                            </TouchableOpacity>
                            <VStack
                                space={5}
                                style={{
                                    marginBottom: 70,
                                }}
                            >
                                {expensesById &&
                                    expensesById.map((item, index) => (
                                        <ItemExpense
                                            key={index}
                                            expense={item}
                                        />
                                    ))}
                            </VStack>
                        </ScrollView>
                    </Animated.View>
                </Box>
            </ScrollView>
            <Box
                w={"full"}
                bottom={0}
                position={"absolute"}
                p={"20px"}
                bg={"white"}
            >
                <TouchableOpacity
                    onPress={() => {
                        setIsOpenAlert(true)
                    }}
                    style={{
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
                        Delete
                    </Text>
                </TouchableOpacity>
            </Box>
            <BlurView
                intensity={60}
                tint="dark"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: isOpenAddExpense ? "flex" : "none",
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
                    <HStack
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
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
                                handle={() => {
                                    setDateOrTime({
                                        form,
                                        mode: "date",
                                        nameField: "date",
                                    })
                                }}
                                disable={true}
                                iconName="calendar-outline"
                                form={form}
                                name={"date"}
                                placeholder={"Enter date"}
                                flex={1}
                                label={"Date"}
                            />
                            <Input
                                handle={() => {
                                    setDateOrTime({
                                        mode: "time",
                                        form,
                                        nameField: "time",
                                    })
                                }}
                                disable={true}
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
                    </VStack>
                    <HStack
                        mt={"5px"}
                        space={4}
                        justifyContent={"space-between"}
                    >
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
                                backgroundColor: "#AAC4FF",
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
            <AlertDialog
                handle={handleDelete}
                title={"Remove Trip"}
                description={"Are you sue to remove this trip ?"}
                isOpen={isOpenAlert}
                setIsOpen={(value: boolean) => setIsOpenAlert(value)}
            />
            {isLoading && <Loading />}
        </Layout>
    )
}
