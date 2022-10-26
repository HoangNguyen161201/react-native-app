import { yupResolver } from "@hookform/resolvers/yup"
import { BlurView } from "expo-blur"
import { Box, Text, useToast, VStack } from "native-base"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Image } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import uuid from "react-native-uuid"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch } from "../app/hooks"
import {
    Alert,
    ConfirmData,
    DialogGetPicture,
    Input,
    Loading,
    Switch,
} from "../components/common"
import Layout from "../components/layouts/Layout"
import { addTrip } from "../features/tripSlice"
import { setDateOrTime } from "../utils/DateTimeHelper"
import { Trip } from "../utils/interfaces"
import { addTripForm } from "../utils/validate"

export const AddTripScreen = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Trip>()
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [img, setImg] = useState("../assets/trip.png")
    const [openGetPicture, setOpenGetPicture] = useState(false)

    const dispatch = useAppDispatch()
    
    const toast = useToast()

    const defaultValues = useMemo<Trip>(() => {
        return {
            id: "",
            img: "../assets/trip.png",
            name: "",
            description: "",
            destination: "",
            isRisk: false,
            date: new Date().toLocaleDateString(),
            memberCount: 0,
            predictedAmount: 0,
        }
    }, [])

    const form = useForm<Trip>({
        defaultValues,
        resolver: yupResolver(addTripForm),
    })

    const { handleSubmit } = form

    const submit = (value: Trip) => {
        const newTrip = {
            ...value,
            id: uuid.v4(),
        }
        setData(newTrip)
        setIsOpenConfirm(true)
    }

    const handleAdd = async () => {
        if (data) {
            dispatch(addTrip(data))
            form.reset(defaultValues)
            setImg("../assets/trip.png")

            toast.show({
                render: () => {
                    return (
                        <Alert
                            type={"success"}
                            message={"Add new trip successfully"}
                        />
                    )
                },
            })
            setIsLoading(false)
            setIsOpenConfirm(false)
        }
    }

    useEffect(() => {
        const { name, destination, date } = form.formState.errors
        if (name || destination || date) {
            setIsLoading(false)
        }
    }, [form.formState.errors])

    return (
        <Layout navigation={navigation} bg="white">
            <ScrollView>
                <VStack space={4} padding={"20px"} flex={1}>
                    <VStack space={1}>
                        <Text fontSize={"20px"} fontWeight={"semibold"}>
                            Add new
                        </Text>
                        <Text fontSize={"14px"} color={"gray.400"}>
                            Enter full field to add new trip
                        </Text>
                    </VStack>
                    <VStack space={3}>
                        <Box
                            borderRadius={"8px"}
                            borderWidth={1}
                            borderColor={"#7E80FF"}
                            overflow={"hidden"}
                            onTouchEnd={() =>
                                setOpenGetPicture((state) => !state)
                            }
                        >
                            <Image
                                style={{
                                    borderWidth: 1,
                                    width: "100%",
                                    height: 150,
                                }}
                                source={
                                    img == "../assets/trip.png"
                                        ? require("../assets/trip.png")
                                        : {
                                              uri: img,
                                          }
                                }
                            />
                            <BlurView
                                intensity={50}
                                tint="dark"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Icon
                                    color={"white"}
                                    style={{ fontSize: 40, opacity: 0.6 }}
                                    name="camera-outline"
                                />
                            </BlurView>
                        </Box>
                        <Input
                            name="name"
                            form={form}
                            label="Name trip"
                            iconName="golf-outline"
                            required
                            placeholder="Enter name trip"
                        />
                        <Input
                            name="destination"
                            form={form}
                            label="Destination"
                            iconName="location-outline"
                            required
                            placeholder="Enter destination"
                        />
                        <Input
                            name="description"
                            form={form}
                            label="Description"
                            iconName="document-text-outline"
                            placeholder="Enter description"
                        />
                        <Input
                            required
                            handle={() => {
                                setDateOrTime({
                                    mode: "date",
                                    form,
                                    nameField: "date",
                                })
                            }}
                            name="date"
                            form={form}
                            label="Date"
                            iconName="calendar-outline"
                            placeholder="Enter date"
                        />
                        <Input
                            name="memberCount"
                            form={form}
                            label="Member count"
                            iconName="people-outline"
                            placeholder="Enter member count"
                            isNumber
                        />
                        <Input
                            name="predictedAmount"
                            form={form}
                            label="Predicted amount"
                            iconName="cash-outline"
                            placeholder="Enter predicted amount"
                            isNumber
                        />
                        <Switch form={form} label="Dangerous" name="isRisk" />
                    </VStack>
                    <TouchableOpacity
                        onPressOut={handleSubmit(submit)}
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
                        }}
                    >
                        <Text
                            fontSize={"16px"}
                            textAlign={"center"}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </VStack>
            </ScrollView>
            <DialogGetPicture
                setImg={(image: string) => {
                    setImg(image)
                    form.setValue("img", image)
                }}
                openGetPicture={openGetPicture}
                setOpenGetPicture={(isOpen: boolean) =>
                    setOpenGetPicture(isOpen)
                }
            />
            <ConfirmData
                setLoading={(value: boolean) => setIsLoading(true)}
                isOpen={isOpenConfirm}
                data={data}
                handle={handleAdd}
                setIsOpen={setIsOpenConfirm}
            />
            {isLoading && <Loading />}
        </Layout>
    )
}
