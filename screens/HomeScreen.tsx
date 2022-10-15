import { BlurView } from "expo-blur"
import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base"
import { useEffect } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { Feature, TripItemHome } from "../components/common"
import Layout from "../components/layouts/Layout"
import { getAllExpensesByLocal } from "../features/expenseSlice"
import { getAllByLocal, updateTripSelected } from "../features/tripSlice"

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    const allTrips = useAppSelector((state) => state.tripsReducer.data)
    const isLogin = useAppSelector(state => state.userReducer.isLogin)
    const dispatch = useAppDispatch()
    const handleDataTrips = async () => {
        await dispatch(getAllByLocal())
        dispatch(getAllExpensesByLocal())
    }

    useEffect(() => {
        handleDataTrips()
    }, [])

    useEffect(()=> {
        if(!isLogin) {
            navigation.navigate('Login')
        }
    }, [])

    return (
        <Layout navigation={navigation} bg={"white"}>
            <VStack p={"20px"} space={4} h={"full"}>
                <VStack space={3}>
                    <HStack
                        w={"full"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Text
                            fontSize={"lg"}
                            fontWeight={"bold"}
                            color={"gray.400"}
                        >
                            Trips
                        </Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Trips')}>
                            <Icon size={20} name="arrow-forward-outline"></Icon>
                        </TouchableOpacity>
                    </HStack>
                    <ScrollView
                        style={{
                            height: "43%",
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {allTrips &&
                            allTrips.map((item, index) => (
                                <TripItemHome
                                    key={index}
                                    handle={() => {
                                        dispatch(updateTripSelected(item))
                                        navigation.navigate("Detail")
                                    }}
                                    item={item}
                                />
                            ))}
                    </ScrollView>
                </VStack>
                <VStack space={3}>
                    <Text
                        fontSize={"lg"}
                        fontWeight={"bold"}
                        color={"gray.400"}
                    >
                        Features
                    </Text>
                    <VStack space={4} w={"full"}>
                        <HStack space={4} w={"full"}>
                            <Feature
                                iconName={"person-outline"}
                                bg="#AAC4FF"
                                handle={() => {
                                    navigation.navigate("Profile")
                                }}
                                title={"Profile"}
                            />
                            <Feature
                                iconName={"call-outline"}
                                bg="#AAC4FF"
                                handle={() => {
                                    navigation.navigate("Contact")
                                }}
                                title={"Contact"}
                            />
                        </HStack>
                        <HStack space={4} w={"full"}>
                            <Feature
                                iconName={"add-outline"}
                                bg="#AAC4FF"
                                handle={() => {
                                    navigation.navigate("Add new")
                                }}
                                title={"Add trip"}
                            />
                            <Feature
                                iconName={"cloud-upload-outline"}
                                bg="#AAC4FF"
                                handle={() => {
                                    console.log("hoang nguyen quang")
                                }}
                                title={"Backup"}
                            />
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        </Layout>
    )
}
