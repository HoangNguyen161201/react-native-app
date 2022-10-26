import {
    Box,
    HStack,
    Input as NInput,
    Text,
    useToast,
    VStack
} from "native-base"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
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
import { Alert, AlertDialog, EmptyTrips, Loading, TripItem } from "../components/common"
import {
    AdvancedSearch,
} from "../components/common/AdvancedSearch"
import Layout from "../components/layouts/Layout"
import { deleteExpenses } from "../features/expenseSlice"
import { deleteTrip } from "../features/tripSlice"
import { AdvancedSearch as IAdvancedSearch, Trip } from "../utils/interfaces"

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
    const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(false)
    const [trips, setTrips] = useState<Array<Trip>>()
    const [searchByTitle, setSearchByTile] = useState("")
    const [advancedSearch, setAdvancedSearch] = useState<IAdvancedSearch>()
    const [isOpenAlert, setIsOpenAlert] = useState(false)

    const toast = useToast()

    const defaultValues = useMemo<IAdvancedSearch>(() => {
        return {
            name: "",
            destination: "",
            startDate: new Date().toLocaleDateString(),
            endDate: new Date().toLocaleDateString(),
        }
    }, [])

    const form = useForm<IAdvancedSearch>({
        defaultValues,
    })

    const { handleSubmit } = form

    const submit = (value: IAdvancedSearch) => {
        setAdvancedSearch(value)
        setIsOpenAdvancedSearch(false)
    }

    useEffect(() => {
        if (allTrips) {
            setTrips(allTrips)
        }
    }, [allTrips])

    useEffect(() => {
        let data: Trip[] = []
        if (allTrips) {
            data = [...allTrips]
        }
        if (advancedSearch) {
            let dataSearch = [...data]
            if (advancedSearch.name) {
                dataSearch = dataSearch.filter((item) =>
                    item.name.includes(advancedSearch.name)
                )
            }
            if (advancedSearch.destination) {
                dataSearch = dataSearch.filter((item) =>
                    item.destination.includes(advancedSearch.destination)
                )
            }
            if (advancedSearch.startDate && advancedSearch.endDate) {
                dataSearch = dataSearch.filter((item) => {
                    if (
                        new Date(item.date) >=
                            new Date(advancedSearch.startDate) &&
                        new Date(item.date) <= new Date(advancedSearch.endDate)
                    ) {
                        return true
                    }
                    return false
                })
            }
            setTrips(dataSearch)
        } else {
            if (searchByTitle) {
                const dataSearch = data.filter((item) =>
                    item.name.includes(searchByTitle)
                )
                setTrips(dataSearch)
            }
        }
    }, [searchByTitle, advancedSearch])

    useEffect(() => {
        Animated.timing(highAnimate, {
            toValue: isOpenSearch ? 0 : 46,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [isOpenSearch])

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

    const handleReset = ()=> {
        setSearchByTile('')
        setAdvancedSearch({
            destination: '',
            endDate: '',
            name: '',
            startDate: '',
        })
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
                <HStack
                    space={4}
                    position={"absolute"}
                    right={"20px"}
                    top={"80px"}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpenAdvancedSearch((state) => !state)
                        }}
                        style={[
                            style.search,
                            {
                                backgroundColor: "#B1B2FF",
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                        ]}
                    >
                        <Icon
                            color={"white"}
                            style={{
                                padding: 6,
                            }}
                            size={20}
                            name="search-outline"
                        ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={ handleReset }
                        style={[
                            style.search,
                            {
                                backgroundColor: "#FF8888",

                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            },
                        ]}
                    >
                        <Icon
                            style={{
                                padding: 6,
                                color: "white",
                            }}
                            size={20}
                            name="refresh-outline"
                        ></Icon>
                    </TouchableOpacity>
                </HStack>
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
                            <NInput
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
                        <EmptyTrips navigation={navigation}/>
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
            <AdvancedSearch
                isOpen={isOpenAdvancedSearch}
                form={form}
                setIsOpen={(value: boolean) => setIsOpenAdvancedSearch(value)}
                handle={handleSubmit(submit)}
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
