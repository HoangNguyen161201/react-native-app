import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    Box,
    HStack,
    Menu,
    Pressable,
    Text,
    useToast,
    VStack
} from "native-base"
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
    DialogAddExpense,
    FieldItemTrip, ItemExpense,
    Loading
} from "../components/common"
import Layout from "../components/layouts/Layout"
import { addExpense, deleteExpenses } from "../features/expenseSlice"
import { deleteTrip } from "../features/tripSlice"
import { Expense } from "../utils/interfaces"
import { addExpenseForm } from "../utils/validate"

export const DetailScreen = ({ navigation }: { navigation: any }) => {
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)
    const [expensesById, setExpenseById] = useState<Array<Expense>>()
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [openExpensesList, setOpenExpensesList] = useState(false)
    const [isOpenAddExpense, setIsOpenAddExpense] = useState(false)

    const fadeAnimate = useRef(new Animated.Value(0)).current

    const dispatch = useAppDispatch()

    const trip = useAppSelector((state) => state.tripsReducer.tripSelected)
    const expenses = useAppSelector((state) => state.expensesReducer.data)
    const address = useAppSelector((state) => state.addressReducer.address)

    useEffect(() => {
        if (expenses && trip) {
            setExpenseById(
                expenses.filter((expense) => expense.idTrip == trip.id)
            )
        }
    }, [expenses])

    const defaultValues = useMemo<Expense>(() => {
        return {
            amount: undefined,
            comment: "",
            date: "",
            time: "",
            type: "Travel",
            id: "",
            idTrip: "",
            address: "",
        }
    }, [])

    const form = useForm<Expense>({
        defaultValues,
        resolver: yupResolver(addExpenseForm),
    })

    const { handleSubmit } = form

    const submit = async (value: Expense) => {
        setIsLoading(true)
        const data = [...expenses]
        value.id = uuid.v4()
        if (trip?.id) {
            value.idTrip = trip?.id
        }
        data.push(value)
        await AsyncStorage.setItem("expenses", JSON.stringify(data))
        dispatch(addExpense(value))
        form.reset({ ...defaultValues, address: address || "" })
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
        setIsOpenAddExpense(false)
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

    useEffect(() => {
        if (address) {
            form.setValue("address", address)
        }
    }, [])

    useEffect(() => {
        const { amount, date, time } = form.formState.errors
        if (amount || date || time) {
            setIsLoading(false)
        }
    }, [form.formState.errors])

    return (
        <Layout nameRedirect="Trips" navigation={navigation} bg={"white"}>
            <ScrollView>
                <Box p={"20px"}>
                    <VStack mb={5} space={0}>
                        <HStack
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            space={3}
                        >
                            <Text fontSize={"20px"} fontWeight={"semibold"}>
                                {trip?.name}
                            </Text>

                            <Box alignItems="center">
                                <Menu
                                    w="190"
                                    trigger={(triggerProps) => {
                                        return (
                                            <Pressable
                                                accessibilityLabel="More options menu"
                                                {...triggerProps}
                                            >
                                                <Icon
                                                    size={20}
                                                    name="ellipsis-horizontal-outline"
                                                />
                                            </Pressable>
                                        )
                                    }}
                                >
                                    <Menu.Item
                                        onPress={() => {
                                            navigation.navigate("Update")
                                        }}
                                    >
                                        Update
                                    </Menu.Item>
                                    <Menu.Item
                                        onPress={() => {
                                            setIsOpenAlert(true)
                                        }}
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu>
                            </Box>
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
                            text={trip?.memberCount}
                            iconName="people-outline"
                        />
                        <FieldItemTrip
                            text={`$${trip?.predictedAmount}`}
                            iconName="cash-outline"
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
                                    setIsOpenAddExpense(true)
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
                                <Text fontSize={"16px"} textAlign={"center"}>
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
            <DialogAddExpense form={form} isOpen={isOpenAddExpense} setIsOpen={(value: boolean)=> setIsOpenAddExpense(value)} submit={submit}/>
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
