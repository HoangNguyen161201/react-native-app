import { Box, HStack, Text, VStack } from "native-base"
import { Image, StyleSheet } from "react-native"
import React from "react"
import { BlurView } from "expo-blur"
import { Trip, updateTripSelected } from "../../features/tripSlice"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { useAppDispatch } from "../../app/hooks"
import Icon from "react-native-vector-icons/Ionicons"

export const TripItem = ({
    item,
    navigation,
    setOpenDelete,
}: {
    item: Trip
    navigation: any
    setOpenDelete: any
}) => {
    const dispatch = useAppDispatch()
    return (
        <Swipeable
            renderRightActions={() => (
                <Box h={"full"} pl={3}>
                    <HStack
                        alignItems={"center"}
                        borderColor={"red.400"}
                        h={"82%"}
                        space={3}
                    >
                        <Icon
                            onPress={() => {
                                dispatch(updateTripSelected(item))
                                navigation.navigate("Update")
                            }}
                            style={{
                                backgroundColor: "#D2DAFF",
                                color: "#6667C3",
                                padding: 10,
                                borderRadius: 8,
                            }}
                            size={20}
                            name="open-outline"
                        ></Icon>
                        <Icon
                            onPress={() => {
                                dispatch(updateTripSelected(item))
                                setOpenDelete()
                            }}
                            style={{
                                backgroundColor: "#FFB7B7",
                                color: "#FF6060",
                                padding: 10,
                                borderRadius: 8,
                            }}
                            size={20}
                            name="trash-outline"
                        ></Icon>
                    </HStack>
                </Box>
            )}
        >
            <Box
                overflow={"hidden"}
                borderWidth={1}
                borderColor={"#7E80FF"}
                marginBottom={25}
                height={120}
                borderRadius={15}
                style={style.listItem}
                onTouchEnd={() => {
                    dispatch(updateTripSelected(item))
                    navigation.navigate("Detail")
                }}
            >
                <Image
                    source={
                        item.img == "../assets/trip.png"
                            ? require("../../assets/trip.png")
                            : {
                                  uri: item.img,
                              }
                    }
                    style={{ borderWidth: 4, height: 120 }}
                />
                <BlurView
                    intensity={60}
                    tint="dark"
                    style={style.imgBlur}
                ></BlurView>
                <Box
                    width={120}
                    height={120}
                    backgroundColor={"#B8C4FF"}
                    position={"absolute"}
                    bottom={-60}
                    right={0}
                    borderRadius={15}
                    style={style.mountain1}
                ></Box>
                <Box
                    width={100}
                    height={100}
                    backgroundColor={"#D2DAFF"}
                    position={"absolute"}
                    bottom={-60}
                    right={70}
                    borderRadius={15}
                    style={style.mountain2}
                ></Box>
                <VStack
                    space={0}
                    position={"absolute"}
                    bottom={"20px"}
                    left={"20px"}
                >
                     <Text color={"gray.200"}>
                        {item.date}
                    </Text>
                    <Text color={"white"} fontSize={"lg"} fontWeight={"bold"}>
                        {item.name}
                    </Text>
                    <Text color={"gray.200"}>
                        {item.description ? item.description : "--"}
                    </Text>
                </VStack>
            </Box>
        </Swipeable>
    )
}
const style = StyleSheet.create({
    mountain1: {
        transform: [{ rotate: "45deg" }],
    },
    mountain2: {
        transform: [{ rotate: "45deg" }],
    },
    imgBlur: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    listItem: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowColor: "#00",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
    },
})
