import { yupResolver } from "@hookform/resolvers/yup"
import { Text, useToast, VStack } from "native-base"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useAppDispatch } from "../app/hooks"
import { Alert, Input, Loading } from "../components/common"
import { loginAccount } from "../features/userSlice"
import { handleAuth, IResultAuth } from "../utils/dbHelper"
import { User } from "../utils/interfaces"
import { loginForm } from "../utils/validate"

export const LoginScreen = ({ navigation }: { navigation: any }) => {
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)
    
    const dispatch = useAppDispatch()
    
    const defaultValues = useMemo<User>(() => {
        return {
            email: "",
            password: "",
        }
    }, [])

    const form = useForm<User>({
        defaultValues,
        resolver: yupResolver(loginForm),
    })

    const { handleSubmit } = form

    const submit = async ({ email, password }: User) => {
        if (email && password) {
            const response: IResultAuth = await handleAuth({
                user: {
                    email,
                    password,
                },
                type: "login",
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
                console.log('email', email)
                dispatch(
                    loginAccount({
                        email,
                        id: response.account?.uid
                    })
                )
                form.reset({
                    email: '',
                    password: '',
                })
                navigation.navigate("Home")
            }
            setIsLoading(false)
        }
    }

    
    useEffect(() => {
        const {email, password} = form.formState.errors
        if(email || password) {
            setIsLoading(false)
        }
    }, [form.formState.errors])

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
                        Hello Again!
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
                        name="password"
                        form={form}
                        label={"Password"}
                        required
                        placeholder={"Enter your password"}
                        iconName={"ellipsis-horizontal-outline"}
                        type={"password"}
                    />
                </VStack>
                <VStack space={4} w={"full"}>
                    <TouchableOpacity
                        onPressIn={() => {
                            setIsLoading(true)
                        }}
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
                            Login
                        </Text>
                    </TouchableOpacity>
                    <Text fontSize={"16px"}>
                        Do not have an account ?{" "}
                        <Text
                            onPress={() => navigation.navigate("Register")}
                            color={"#6667C3"}
                        >
                            Register now
                        </Text>
                    </Text>
                </VStack>
            </VStack>
            {isLoading && <Loading />}
        </ScrollView>
    )
}
