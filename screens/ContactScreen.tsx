import { HStack, Text, useToast, VStack } from "native-base"
import { useCallback } from "react"
import { Clipboard, Image, Linking } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/Ionicons"
import { Alert } from "../components/common"
import Layout from "../components/layouts/Layout"
import {
    ENV_CONTACT_DESCRIPTION, ENV_CONTACT_EMAIL,
    ENV_CONTACT_FACEBOOK, ENV_CONTACT_JOB, ENV_CONTACT_NAME, ENV_CONTACT_PHONE
} from "../env"

export const ContactScreen = ({ navigation }: { navigation: any }) => {
    const toast = useToast()

    const copyText = useCallback((text: string) => {
        Clipboard.setString(text)
        toast.show({
            render: () => {
                return <Alert type={"success"} message={"Copy successfully"} />
            },
        })
    }, [])

    const redirectToWeb = useCallback((text: string) => {
        Linking.canOpenURL(text).then((supported) => {
            supported && Linking.openURL(text)
        })
    }, [])

    return (
        <Layout navigation={navigation} color={"white"} bg={"#2d2626"}>
            <VStack space={4} p={"20px"}>
                <Text color={"white"} fontSize={"xl"} fontWeight={"bold"}>
                    My contact
                </Text>
                <VStack
                    space={6}
                    alignItems={"center"}
                    borderRadius={"20px"}
                    bg={"#B1B2FF"}
                    w={"full"}
                    h={"86%"}
                    py={8}
                    px={5}
                >
                    <Image
                        style={{
                            backgroundColor: "#D2DAFF",
                            width: 180,
                            height: 180,
                            borderRadius: 100,
                        }}
                        source={{
                            uri: `https://avatars.dicebear.com/api/big-smile/${ENV_CONTACT_NAME}.png`,
                        }}
                    />
                    <VStack space={1} w={"full"}>
                        <Text fontWeight={"semibold"} fontSize={"18px"}>
                            {ENV_CONTACT_NAME}
                        </Text>
                        <Text color={"gray.500"}>{ENV_CONTACT_JOB}</Text>
                    </VStack>
                    <Text>{ENV_CONTACT_DESCRIPTION}</Text>
                    <HStack w={"full"} justifyContent={"center"} space={5}>
                        <TouchableOpacity
                            onPress={() => copyText(ENV_CONTACT_EMAIL)}
                        >
                            <Icon
                                size={20}
                                style={{
                                    backgroundColor: "#D2DAFF",
                                    padding: 10,
                                    borderRadius: 8,
                                }}
                                name="mail-outline"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => copyText(ENV_CONTACT_PHONE)}
                        >
                            <Icon
                                size={20}
                                style={{
                                    backgroundColor: "#D2DAFF",
                                    padding: 10,
                                    borderRadius: 8,
                                }}
                                name="call-outline"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => redirectToWeb(ENV_CONTACT_FACEBOOK)}
                        >
                            <Text
                                style={{
                                    backgroundColor: "#D2DAFF",
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    fontSize: 18,
                                }}
                            >
                                F
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => redirectToWeb(ENV_CONTACT_FACEBOOK)}
                        >
                            <Icon
                                size={20}
                                style={{
                                    backgroundColor: "#D2DAFF",
                                    padding: 10,
                                    borderRadius: 8,
                                }}
                                name="logo-instagram"
                            />
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </VStack>
        </Layout>
    )
}
