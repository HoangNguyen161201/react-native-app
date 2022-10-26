import { Avatar, Box, HStack, Text } from "native-base"
import { useEffect } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getAddress } from "../../features/addressSlice"
import { getAllExpensesByLocal } from "../../features/expenseSlice"
import { getAllByLocal } from "../../features/tripSlice"
import { getUserInfoByLocal } from "../../features/userSlice"
import { restoreData } from "../../utils/dbHelper"
import { Layout as ILayout } from "../../utils/interfaces"

const Layout = ({
    children,
    navigation,
    bg,
    color,
    isEmpty,
    nameRedirect,
}: ILayout) => {
    console.log(navigation)
    const dispatch = useAppDispatch()
    const { isLogin, infoUser } = useAppSelector((state) => state.userReducer)

    useEffect(() => {
        const getAddressInterval = setInterval(async () => {
            dispatch(getAddress())
        }, 5000)
        return () => clearInterval(getAddressInterval)
    })

    const handleDataTrips = async () => {
        await restoreData()
        dispatch(getUserInfoByLocal())
        dispatch(getAllByLocal())
        dispatch(getAllExpensesByLocal())
    }

    useEffect(() => {
        if (isLogin) {
            handleDataTrips()
        }
    }, [isLogin])

    if (isEmpty) {
        return <Box flex={1}>{children}</Box>
    }
    return (
        <Box flex={1} backgroundColor={bg}>
            <HStack
                pb={2}
                marginTop={"40px"}
                flex={0}
                paddingX={"20px"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                {nameRedirect ? (
                    <Box
                        onTouchEnd={() => {
                            navigation.navigate(nameRedirect)
                        }}
                    >
                        <Icon
                            name="arrow-back-outline"
                            color={color}
                            size={30}
                        />
                    </Box>
                ) : (
                    <Box
                        onTouchEnd={() => {
                            navigation.openDrawer()
                        }}
                    >
                        <Icon
                            color={color}
                            name="menu-outline"
                            size={30}
                        ></Icon>
                    </Box>
                )}
                <HStack alignItems={"center"} space={4}>
                    <Text color={color}>{infoUser?.name || "--"}</Text>
                    <Avatar
                        bg={"#6667C3"}
                        source={{
                            uri:
                                infoUser?.avatar ||
                                "https://avatars.dicebear.com/api/big-smile/:seed.png",
                        }}
                        size={"35px"}
                    >
                        --
                    </Avatar>
                </HStack>
            </HStack>
            {children}
        </Box>
    )
}

export default Layout
