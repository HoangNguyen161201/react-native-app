import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer"
import { Avatar, Box, HStack, Text, VStack } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"

export const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <VStack flex={1}>
            <HStack
                bg={"#EEF1FF"}
                alignItems={"center"}
                pt={"35px"}
                pb={"30px"}
                paddingX={"10px"}
                space={"10px"}
            >
                <Avatar bg={"#6667C3"} size={"md"}>
                    --
                </Avatar>
                <Box>
                    <Text fontSize={"16px"} fontWeight={"semibold"}>
                        Nguyen Quang Hoang
                    </Text>
                    <Text color={"gray.400"} fontSize={"14px"}>
                        hoangdev161201@gmai.com
                    </Text>
                </Box>
            </HStack>
            <Box flex={1}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </Box>
            <Box p={'10px'}>
                <TouchableOpacity
                    onPressOut={() => {}}
                    style={{
                        width: "100%",
                        backgroundColor: "#FF8888",
                        borderRadius: 4,
                        padding: 8,
                    }}
                >
                    <Text fontSize={"16px"} w={"100%"} textAlign={"center"}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </Box>
        </VStack>
    )
}
