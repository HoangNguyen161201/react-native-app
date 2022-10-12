import { Box, Select as NSelect, Text, VStack } from "native-base"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import Icon from "react-native-vector-icons/Ionicons"
import { TType } from "../../features/expenseSlice"

interface ISelect {
    name: string
    required?: boolean
    form: UseFormReturn<any, any>
    label: string
    options: Array<TType>
    flex?: number
}

export const Select = ({
    name,
    label,
    required = false,
    form,
    options,
    flex,
}: ISelect) => {
    const [value, setValue] = useState<TType>(options[0])
    return (
        <VStack space={2} flex={flex}>
            <Text fontSize={"14px"} color={"gray.400"}>
                {label} {required && <Text color={"red.400"}>*</Text>}
            </Text>
            <Box
                borderWidth={1}
                height={"46px"}
                borderColor={"gray.300"}
                borderRadius={8}
                px={3}
            >
                <NSelect
                    selectedValue={value}
                    height={"38px"}
                    fontSize={14}
                    accessibilityLabel="Choose Service"
                    borderWidth={0}
                    dropdownIcon={
                        <Icon
                            style={{
                                fontSize: 16,
                                color: "gray",
                            }}
                            name="chevron-down-outline"
                        />
                    }
                    _selectedItem={{
                        bg: "#AAC4FF",
                        borderRadius: 8,
                        // endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(item) => {
                        form.setValue(name, item)
                        setValue(item as TType)
                    }}
                >
                    {options.map((item, index) => (
                        <NSelect.Item key={index} label={item} value={item} />
                    ))}
                </NSelect>
            </Box>
        </VStack>
    )
}

