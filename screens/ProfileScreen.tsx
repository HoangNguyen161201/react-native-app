import { Avatar, Box, Text, VStack } from "native-base"
import Layout from "../components/layouts/Layout"
import Icon from "react-native-vector-icons/Ionicons"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useForm } from "react-hook-form"
import { useMemo } from "react"
import { Input } from "../components/common"

export const ProfileScreen = ({ navigation }: { navigation: any }) => {
    const defaultValues = useMemo(() => {
        return {
            name: "",
            email: "",
            phone: "",
            address: "",
            facebook: "",
            job: "",
        }
    }, [])

    const form = useForm({
        defaultValues,
    })

    const { handleSubmit } = form

    const submit = async (value: any) => {}
    return (
        <Layout navigation={navigation} bg={"white"}>
            <ScrollView>
                <VStack space={4} alignItems={"center"} p={"20px"}>
                    <Text w={"full"} fontSize={"20px"} fontWeight={"semibold"}>
                        My profile
                    </Text>
                    <VStack alignItems={"center"}>
                        <Avatar
                            bg={"#D2DAFF"}
                            source={{
                                uri: "https://avatars.dicebear.com/api/big-smile/:seed.png",
                            }}
                            size={"150px"}
                        >
                            --
                        </Avatar>
                        <TouchableOpacity
                            style={{
                                marginTop: -20,
                            }}
                        >
                            <Icon
                                style={{
                                    backgroundColor: "#6667C3",
                                    color: "white",
                                    padding: 5,
                                    paddingLeft: 8,

                                    fontSize: 25,
                                    borderRadius: 30,
                                    borderColor: "white",
                                    borderWidth: 2,
                                }}
                                name={"camera-outline"}
                            />
                        </TouchableOpacity>
                    </VStack>
                    <VStack space={3} w={"full"}>
                        <Input
                            required
                            iconName="person-outline"
                            form={form}
                            name={"name"}
                            label={"Name"}
                            placeholder={"Enter your name"}
                        />
                        <Input
                            required
                            iconName="mail-outline"
                            form={form}
                            name={"email"}
                            label={"Email"}
                            placeholder={"Enter your name"}
                        />
                        <Input
                            iconName="call-outline"
                            form={form}
                            name={"phone"}
                            label={"Phone number"}
                            placeholder={"Enter your name"}
                        />
                        <Input
                            iconName="briefcase-outline"
                            form={form}
                            name={"job"}
                            label={"Job"}
                            placeholder={"Enter your name"}
                        />
                        <Input
                            iconName="cafe-outline"
                            form={form}
                            name={"facebook"}
                            label={"Facebook"}
                            placeholder={"Enter your name"}
                        />
                        <Input
                            iconName="location-outline"
                            form={form}
                            name={"address"}
                            label={"Address"}
                            placeholder={"Enter your name"}
                        />
                    </VStack>
                    <Box mt={2} w={"full"}>
                        <TouchableOpacity
                            onPressIn={() => {}}
                            onPressOut={handleSubmit(submit)}
                            style={{
                                width: "100%",
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
                            <Text fontSize={"16px"} textAlign={"center"}>
                                Update profile
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </VStack>
            </ScrollView>
        </Layout>
    )
}