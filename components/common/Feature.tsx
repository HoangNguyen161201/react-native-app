import { Text, VStack } from "native-base"
import Icon from "react-native-vector-icons/Ionicons"

interface IFeature {
    bg: string
    title: string
    handle: any
    iconName: any
}

export const Feature = ({bg, title, handle, iconName}: IFeature) => {
    return (
        <VStack
            onTouchEnd={()=> {
                handle()
            }}
            bg={bg}
            py={3}
            flex={1}
            borderRadius={'10px'}
            space={2}
            alignItems={"center"}
        >
            <Icon size={25} name={iconName}></Icon>
            <Text fontSize={"16px"} w={"full"} textAlign={"center"}>
                {title}
            </Text>
        </VStack>
    )
}
