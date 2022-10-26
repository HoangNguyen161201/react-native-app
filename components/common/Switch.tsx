import { Box, Text, VStack } from "native-base"
import { useState } from "react"
import { Switch as NSwitch } from "react-native"
import { Switch as ISwitch } from "../../utils/interfaces"

export const Switch = ({
    name,
    label,
    required = false,
    form,
    value = false,
}: ISwitch) => {
    const [isChecked, setIsChecked] = useState(value)
    return (
        <VStack space={0}>
            <Text fontSize={"14px"} color={"gray.400"}>
                {label} {required && <Text color={"red.400"}>*</Text>}
            </Text>
            <Box w={"42px"}>
                <NSwitch
                    thumbColor={"#6667C3"}
                    value={isChecked}
                    onChange={(event: any) => {
                        setIsChecked(event.nativeEvent.value)
                        form.setValue(name, event.nativeEvent.value)
                    }}
                />
            </Box>
        </VStack>
    )
}
