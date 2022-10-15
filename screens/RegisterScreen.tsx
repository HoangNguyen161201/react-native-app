import { yupResolver } from "@hookform/resolvers/yup"
import { Text, useToast, VStack } from "native-base"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { Input } from "../components/common"
import { Alert } from "../components/common/Alert"
import { IUser } from "../features/userSlice"
import { handleAuth, IResultAuth } from "../utils/dbHelper"
import { registerForm } from "../utils/validate"

interface IRegister extends IUser {
    confirmPassword: string
}

export const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const toast = useToast()
    const defaultValues = useMemo<IRegister>(() => {
        return {
            email: "",
            password: "",
            confirmPassword: "",
        }
    }, [])

    const form = useForm<IRegister>({
        defaultValues,
        resolver: yupResolver(registerForm),
    })

    const { handleSubmit } = form

    const submit = async ({ email, password }: IRegister) => {
        if (email && password) {
            const response: IResultAuth = await handleAuth({
                user: {
                    email,
                    password,
                },
                type: "register",
            })
            toast.show({
                render: () => {
                    return (
                        <Alert
                            type={response.success ? "success" : "error"}
                            message={response.message}
                        />
                    )
                },
            })
            if (response.success) {
                form.reset({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                navigation.navigate("Login")
            }
        }
    }

    return (
        <ScrollView>
            <VStack
                space={8}
                alignItems={"center"}
                h={"full"}
                mt={"50px"}
                p={"20px"}
            >
                <VStack space={1} w={"full"}>
                    <Text fontSize={"20px"} fontWeight={"semibold"}>
                        Register now!
                    </Text>
                    <Text color={"gray.500"} fontSize={"14px"}>
                        Welcome back you've been missed!{" "}
                    </Text>
                </VStack>
                <VStack space={3} w={"full"}>
                    <Input
                        checkEmail
                        name="email"
                        form={form}
                        label={"Email"}
                        required
                        placeholder={"Enter your email"}
                        iconName={"mail-outline"}
                    />
                    <Input
                        strongPassword
                        type={"password"}
                        name="password"
                        form={form}
                        label={"Password"}
                        required
                        placeholder={"Enter your password"}
                        iconName={"ellipsis-horizontal-outline"}
                    />
                    <Input
                        match="password"
                        type={"password"}
                        name="confirmPassword"
                        form={form}
                        label={"Confirm password"}
                        required
                        placeholder={"Enter your confirm password"}
                        iconName={"ellipsis-horizontal-outline"}
                    />
                </VStack>
                <VStack space={4} w={"full"}>
                    <TouchableOpacity
                        onPressIn={() => {}}
                        onPressOut={handleSubmit(submit)}
                        style={{
                            width: "100%",
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
                        <Text fontSize={"16px"} w={"100%"} textAlign={"center"}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <Text fontSize={"16px"}>
                        Do you already have an account ?{" "}
                        <Text
                            onPress={() => navigation.navigate("Login")}
                            color={"#6667C3"}
                        >
                            Login now
                        </Text>
                    </Text>
                </VStack>
            </VStack>
        </ScrollView>
    )
}
