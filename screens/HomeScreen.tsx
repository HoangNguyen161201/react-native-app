import { Box } from "native-base"
import Layout from "../components/layouts/Layout"

export const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <Layout navigation={navigation} bg={"white"}>
            <Box>this is home screen</Box>
        </Layout>
    )
}
