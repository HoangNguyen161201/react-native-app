import { BlurView } from "expo-blur"
import { Text, VStack } from "native-base"
import React from "react"
import { Animated, TouchableOpacity } from "react-native"
import {
    openImageByCameraAsync,
    openImagePickerAsync,
} from "../../utils/pictureHelper"
import { useEffect, useRef } from "react"

interface IDialogGetPicture {
    openGetPicture: boolean
    setOpenGetPicture: any
    setImg: any
}

export const DialogGetPicture = ({
    openGetPicture,
    setOpenGetPicture,
    setImg,
}: IDialogGetPicture) => {
    const fadeAnimate = useRef(new Animated.Value(-280)).current

    useEffect(() => {
        Animated.timing(fadeAnimate, {
            toValue: openGetPicture ? 0 : -280,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [openGetPicture])

    return (
        <BlurView
            intensity={80}
            tint="dark"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                borderWidth: 2,
                width: "100%",
                height: "100%",
                display: openGetPicture ? "flex" : "none",
            }}
        >
            <Animated.View
                style={{
                    bottom: fadeAnimate,
                    position: "absolute",
                    width: "100%",
                    left: 0,
                }}
            >
                <VStack bg={"white"} space={5} p={"20px"} borderRadius={"10px"}>
                    <Text fontSize={"md"}>
                        get your{" "}
                        <Text
                            fontSize={"xl"}
                            color={"#8F90F0"}
                            fontWeight={"bold"}
                        >
                            Picture
                        </Text>
                    </Text>
                    <VStack space={2}>
                        <TouchableOpacity
                            onPress={async () => {
                                setOpenGetPicture(false)
                                const data: any = await openImageByCameraAsync()
                                if (data.uri)
                                    setImg(
                                        `data:image/jpeg;base64,${data.base64}`
                                    )
                            }}
                            style={{
                                marginTop: 10,
                                backgroundColor: "#D2DAFF",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >
                            <Text
                                fontSize={"16px"}
                                color={"#6667C3"}
                                textAlign={"center"}
                            >
                                Take a picture
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={async () => {
                                setOpenGetPicture(false)
                                const data: any = await openImagePickerAsync()
                                if (data.uri)
                                    setImg(
                                        `data:image/jpeg;base64,${data.base64}`
                                    )
                            }}
                            style={{
                                marginTop: 10,
                                backgroundColor: "#D2DAFF",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >
                            <Text
                                fontSize={"16px"}
                                color={"#6667C3"}
                                textAlign={"center"}
                            >
                                Get picture in library
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenGetPicture(false)
                            }}
                            style={{
                                marginTop: 10,
                                backgroundColor: "#EAEAEA",
                                borderRadius: 8,
                                padding: 8,
                            }}
                        >
                            <Text
                                fontSize={"16px"}
                                color={"black"}
                                textAlign={"center"}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </VStack>
                </VStack>
            </Animated.View>
        </BlurView>
    )
}