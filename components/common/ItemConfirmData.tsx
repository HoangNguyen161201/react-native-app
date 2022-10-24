import { HStack, Text } from "native-base"
import React from "react"

export default function ItemConfirmData({value, label}: {
    value: string | number
    label: string
}) {
    return (
        <HStack space={3} alignItems={"center"}>
            <Text fontSize={"16px"} w={"100px"}>
                {label}
            </Text>
            <Text
                fontSize={"16px"}
                bg={"#D2DAFF"}
                py={1}
                px={2}
                borderRadius={4}
                flex={1}
            >
                {value}
            </Text>
        </HStack>
    )
}
