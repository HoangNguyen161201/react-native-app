import { Box } from "native-base"
import { Alert as IAlert } from "../../utils/interfaces"

export const Alert = ({ message, type }: IAlert) => {
    return (
        <Box
            bg={`${type == "error" ? "red.100" : "emerald.100"}`}
            px="2"
            py="1"
            rounded="sm"
            mb={5}
        >
            {message}
        </Box>
    )
}
