import {
    Box,
    Center,
    HStack,
    Text,
    Tooltip,
    useToast,
    VStack,
} from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import { Expense } from "../../utils/interfaces"
import { Alert } from "./Alert"

export const ItemExpense = ({ expense }: { expense: Expense }) => {
    const toast = useToast()
    return (
        <VStack space={2} bg={"#D2DAFF"} p={3} borderRadius={"10px"}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize={"14px"} color={"#6667C3"}>
                    {`${expense.date} ${expense.time}`}
                </Text>
                <Box
                    onTouchEnd={() => {
                        toast.show({
                            render: () => {
                                return (
                                    <Alert
                                        type={"success"}
                                        message={expense.comment || "--"}
                                    />
                                )
                            },
                        })
                    }}
                    borderRadius={4}
                    bg={"#AAC4FF"}
                    p={2}
                >
                    <Icon name="information-outline"></Icon>
                </Box>
            </HStack>
            <Text fontWeight={"bold"} fontSize={"16px"}>
                {expense.type}
            </Text>
            <Text color={"gray.500"}>{expense.address}</Text>
            <Text color={"red.500"}>$ {expense.amount}</Text>
        </VStack>
    )
}
