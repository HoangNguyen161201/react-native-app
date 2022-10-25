import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { BlurView } from "expo-blur"
import { Box, Text, useToast, VStack } from "native-base"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Image } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Trip, updateTrip } from "../features/tripSlice"
import { yupResolver } from "@hookform/resolvers/yup"
import { addTripForm } from "../utils/validate"
import {
    Alert,
    DialogGetPicture,
    Input,
    Loading,
    Switch,
} from "../components/common"
import Layout from "../components/layouts/Layout"

export const UpdateTripScreen = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState("../assets/trip.png")
    const [openGetPicture, setOpenGetPicture] = useState(false)
    const dispatch = useAppDispatch()
    const trip = useAppSelector((state) => state.tripsReducer.tripSelected)
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

    useEffect(() => {
        if (trip) {
            form.reset(trip)
            setImg(trip.img)
        }
    }, [trip])

    const { handleSubmit } = form

    const submit = (value: Trip) => {
        dispatch(updateTrip(value))
        toast.show({
            render: () => {
                return (
                    <Alert
                        type={"success"}
                        message={"Update trip successfully"}
                    />
                )
            },
        })
        setIsLoading(false)
        navigation.navigate("Trips")
    }
    useEffect(() => {
        const { name, destination, date } = form.formState.errors
        if (name || destination || date) {
            setIsLoading(false)
        }
    }, [form.formState.errors])

    return (
        <Layout nameRedirect="Detail" navigation={navigation} bg="white">
            <ScrollView>
                <VStack space={4} padding={"20px"} flex={1}>
                    <VStack space={1}>
                        <Text fontSize={"20px"} fontWeight={"semibold"}>
                            Update trip
                        </Text>
                        <Text fontSize={"14px"} color={"gray.400"}>
                            Enter full field to update trip
                        </Text>
                    </VStack>
                    <VStack space={3}>
                        <Box
                            borderRadius={"8px"}
                            borderWidth={1}
                            borderColor={"#7E80FF"}
                            overflow={"hidden"}
                            onTouchEnd={async () => {
                                if (openGetPicture) {
                                    setOpenGetPicture(false)
                                    return
                                }
                                setOpenGetPicture(true)
                            }}
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
                                DateTimePickerAndroid.open({
                                    mode: "date",
                                    value: new Date(),
                                    onChange: (event, date) => {
                                        if (date)
                                            form.setValue(
                                                "date",
                                                date.toLocaleDateString()
                                            )
                                    },
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
                        <Switch
                            value
                            form={form}
                            label="Dangerous"
                            name="isRisk"
                        />
                    </VStack>
                    <TouchableOpacity
                        onPressIn={() => setIsLoading(true)}
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
                            color={"black"}
                            textAlign={"center"}
                        >
                            Update
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
            {isLoading && <Loading />}
        </Layout>
    )
}
