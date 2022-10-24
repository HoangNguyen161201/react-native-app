import { HStack, Text } from "native-base"
import Icon from "react-native-vector-icons/Ionicons"

export const FieldItemTrip = ({
    text,
    iconName,
}: {
    text?: string | number
    iconName: string
}) => {
    return (
        <HStack alignItems={"center"} space={2}>
            <Icon
                style={{
                    fontSize: 20,
                    color: "#6667C3",
                }}
                name={iconName}
            />
            <Text fontSize={"16px"}>{text}</Text>
        </HStack>
    )
}

