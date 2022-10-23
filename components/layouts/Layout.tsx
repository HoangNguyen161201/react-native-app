import { Avatar, Box, HStack, Text } from "native-base"
import { ReactNode, useEffect } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { getAddress } from "../../features/addressSlice"
import { useAppDispatch } from "../../app/hooks"

const Layout = ({
    children,
    navigation,
    bg,
    color,
    isEmpty
}: {
    children: ReactNode
    navigation: any
    bg?: string
    color?: string
    isEmpty?: boolean
}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const getAddressInterval = setInterval(async ()=> {
            dispatch(getAddress())
        }, 5000)
        return ()=> clearInterval(getAddressInterval)
    })

    if(isEmpty) {
        return (
            <Box flex={1}>
                {children}
            </Box>
        )
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
                <Box
                    onTouchEnd={() => {
                        navigation.openDrawer()
                    }}
                >
                    <Icon color={color} name="menu-outline" size={30}></Icon>
                </Box>
                <HStack alignItems={"center"} space={4}>
                    <Text color={color}>Nguyen Quang Hoang</Text>
                    <Avatar
                        bg={"#6667C3"}
                        source={{
                            uri: "https://avatars.dicebear.com/api/big-smile/:seed.png",
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
