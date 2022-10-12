import * as Location from "expo-location"
import { Box, HStack, Input, Text, useToast, VStack } from "native-base"
import { useEffect, useRef, useState } from "react"
import {
    Animated,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Alert, AlertDialog, Loading, TripItem } from "../components/common"
import Layout from "../components/layouts/Layout"
import {
    deleteExpenses,
    getAllExpensesByLocal
} from "../features/expenseSlice"
import {
    deleteTrip,
    getAllByLocal,
    Trip
} from "../features/tripSlice"

export const TripScreen = ({
    navigation,
}: {
    navigation: {
        openDrawer: Function
        navigate: any
    }
}) => {
    const dispatch = useAppDispatch()
    const allTrips = useAppSelector((state) => state.tripsReducer.data)
    const tripSelected = useAppSelector(
        (state) => state.tripsReducer.tripSelected
    )
    const highAnimate = useRef(new Animated.Value(46)).current
    const [isOpenSearch, setIsOpenSearch] = useState(false)
    const [trips, setTrips] = useState<Array<Trip>>()
    const [searchByTitle, setSearchByTile] = useState("")
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const toast = useToast()

    useEffect(() => {
        if (allTrips) {
            setTrips(allTrips)
        }
    }, [allTrips])

    useEffect(() => {
        if (trips && searchByTitle) {
            const data = [...trips].filter((item) =>
                item.name.includes(searchByTitle)
            )
            setTrips(data)
        } else {
            setTrips(allTrips)
        }
    }, [searchByTitle])

    useEffect(() => {
        Animated.timing(highAnimate, {
            toValue: isOpenSearch ? 0 : 46,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [isOpenSearch])

    const handleDataTrips = async () => {
        await dispatch(getAllByLocal())
        dispatch(getAllExpensesByLocal())
    }

    useEffect(() => {
        handleDataTrips()
    }, [])

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
            console.log("loi rooi")
            return
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        })

        let address = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        })
        if (location) {
            console.log("nguyen quang hoang", location.coords, address.length)
        }
        // try {

        //   console.log('nguyen quang hoang')
        //   Geocoder.init('AIzaSyAmoBrBpJwJCCEqK4-J95OmpC22YXIahAY')
        //   const data = await Geocoder.from(41.89, 12.49)
        //   console.log(data)
        //   console.log('nguyen quang hoang')
        // } catch (error) {
        //   console.log(error)
        // }
    }

    const handleDelete = () => {
        setIsOpenAlert(false)
        if (tripSelected) {
            dispatch(deleteExpenses(tripSelected.id))
            dispatch(deleteTrip(tripSelected.id))
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
        <Layout bg="#D2DAFF" navigation={navigation}>
            <SafeAreaView style={{ flex: 1 }}>
                <Box
                    position={"absolute"}
                    top={"32px"}
                    left={"23%"}
                    backgroundColor={"#EEF1FF"}
                    borderRadius={100}
                    width={"50%"}
                    height={400}
                />
                <Box
                    height={120}
                    flex={0}
                    justifyContent={"flex-end"}
                    alignItems={"center"}
                >
                    <Image
                        source={require("../assets/trip.png")}
                        style={{ width: "60%" }}
                    />
                </Box>
                <Box
                    padding={"20px"}
                    flex={1}
                    borderTopLeftRadius={30}
                    borderTopRightRadius={30}
                    backgroundColor={"white"}
                >
                    <HStack
                        w={"full"}
                        justifyContent={"space-between"}
                        marginBottom={"20px"}
                        alignItems={"center"}
                        space={4}
                    >
                        <VStack overflow={"hidden"} h={"46px"} flex={1}>
                            <Animated.View
                                style={{
                                    height: highAnimate,
                                    overflow: "hidden",
                                }}
                            >
                                <Text py={3} h={"full"} fontSize={"md"}>
                                    Your{" "}
                                    <Text
                                        fontSize={"xl"}
                                        color={"#8F90F0"}
                                        fontWeight={"bold"}
                                    >
                                        Trips
                                    </Text>
                                </Text>
                            </Animated.View>
                            <Input
                                value={searchByTitle}
                                onChange={(event) => {
                                    setSearchByTile(event.nativeEvent.text)
                                }}
                                InputLeftElement={
                                    <Icon
                                        style={{
                                            marginLeft: 15,
                                            fontSize: 15,
                                            color: "gray",
                                        }}
                                        name={"search-outline"}
                                    />
                                }
                                borderRadius={8}
                                fontSize={"14px"}
                                w={"full"}
                                placeholder="Enter title to search"
                            />
                        </VStack>

                        <TouchableOpacity
                            onPress={() => {
                                setIsOpenSearch((state) => !state)
                            }}
                            style={style.search}
                        >
                            <Icon
                                color={"#6667C3"}
                                style={{
                                    padding: 6,
                                }}
                                size={20}
                                name="search-outline"
                            ></Icon>
                        </TouchableOpacity>
                    </HStack>
                    {trips && trips.length > 0 ? (
                        <FlatList
                            data={trips}
                            renderItem={({ item, index }) => (
                                <TripItem
                                    setOpenDelete={() => setIsOpenAlert(true)}
                                    navigation={navigation}
                                    item={item}
                                    key={index}
                                />
                            )}
                        />
                    ) : (
                        <Box>
                            <Image
                                source={require("../assets/empty.png")}
                                style={{
                                    opacity: 0.5,
                                    marginTop: -60,
                                    transform: [
                                        {
                                            scale: 0.6,
                                        },
                                    ],
                                }}
                            />

                            <Text
                                textAlign={"center"}
                                mt={-10}
                                color={"gray.400"}
                                fontSize={"16px"}
                            >
                                Data empty, add a new trip
                            </Text>
                            <HStack mt={3} justifyContent={"center"}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Add new")
                                    }}
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
                                        width: 80,
                                    }}
                                >
                                    <Text
                                        fontSize={"16px"}
                                        color={"white"}
                                        textAlign={"center"}
                                    >
                                        Add new
                                    </Text>
                                </TouchableOpacity>
                            </HStack>
                        </Box>
                    )}
                </Box>
                {!trips && <Loading />}
            </SafeAreaView>
            <AlertDialog
                handle={handleDelete}
                title={"Remove Trip"}
                description={"Are you sue to remove this trip ?"}
                isOpen={isOpenAlert}
                setIsOpen={(value: boolean) => setIsOpenAlert(value)}
            />
        </Layout>
    )
}

const style = StyleSheet.create({
    search: {
        backgroundColor: "#D2DAFF",
        borderRadius: 8,
        padding: 5,
    },
})
