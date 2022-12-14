import { Input as BaseInput, Text, VStack } from "native-base"
import { Controller } from "react-hook-form"
import Icon from "react-native-vector-icons/Ionicons"
import { Input as IInput } from "../../utils/interfaces"

export const Input = ({
    name,
    iconName,
    placeholder,
    required = false,
    form,
    label,
    disable = false,
    handle,
    flex,
    isNumber = false,
    type,
}: IInput) => {
    const {
        control,
        formState: { errors },
    } = form
    return (
        <VStack
            flex={flex}
            space={2}
            onTouchEnd={() => {
                if (handle) {
                    handle()
                }
            }}
        >
            <Text fontSize={"14px"} color={"gray.400"}>
                {label} {required && <Text color={"red.400"}>*</Text>}
            </Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <BaseInput
                        type={type}
                        keyboardType={isNumber ? "numeric" : undefined}
                        InputLeftElement={
                            <Icon
                                style={{
                                    marginLeft: 15,
                                    fontSize: 15,
                                    color: "gray",
                                }}
                                name={iconName}
                            />
                        }
                        backgroundColor={disable ? "gray.200" : "white"}
                        borderRadius={8}
                        placeholder={placeholder}
                        fontSize={"14px"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        isReadOnly={disable}
                    />
                )}
                name={name}
            />
            {errors[name] && (
                <Text color={"red.500"}>{`${errors[name]?.message}`}</Text>
            )}
        </VStack>
    )
}
