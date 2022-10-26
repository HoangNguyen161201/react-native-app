import { BlurView } from "expo-blur"
import { Box, Text, VStack, Image} from "native-base"
import { Trip } from "../../utils/interfaces"

export const TripItemHome = ({item, handle}: {item: Trip, handle: any}) => {
    return (
        <Box
            onTouchEnd={()=> handle()}
            borderRadius={10}
            w={"330px"}
            mr={"20px"}
            h={"100%"}
            overflow={"hidden"}
            borderColor={"#6667C3"}
            borderWidth={2}
        >
            <Image
                alt={item.name}
                source={
                    item.img == "../assets/trip.png"
                        ? require("../../assets/trip.png")
                        : {
                              uri: item.img,
                          }
                }
                style={{
                    width: "100%",
                    borderWidth: 4,
                    height: "100%",
                }}
            />
            <BlurView
                style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 0,
                    left: 0,
                    height: 100,
                }}
                intensity={70}
                tint="dark"
            >
                <Box
                    width={120}
                    height={120}
                    backgroundColor={"#B8C4FF"}
                    position={"absolute"}
                    bottom={-60}
                    right={0}
                    borderRadius={15}
                    style={{
                        transform: [
                            {
                                rotate: "45deg",
                            },
                        ],
                    }}
                ></Box>
                <Box
                    width={100}
                    height={100}
                    backgroundColor={"#D2DAFF"}
                    position={"absolute"}
                    bottom={-60}
                    right={70}
                    borderRadius={15}
                    style={{
                        transform: [
                            {
                                rotate: "45deg",
                            },
                        ],
                    }}
                ></Box>
                <VStack
                    space={0}
                    position={"absolute"}
                    bottom={"20px"}
                    left={"20px"}
                >
                    <Text color={"gray.200"}>
                        {item.date}
                    </Text>
                    <Text color={"white"} fontSize={"lg"} fontWeight={"bold"}>
                        {item.name}
                    </Text>
                    <Text color={"gray.200"}>
                        {item.description ? item.description : "--"}
                    </Text>
                </VStack>
            </BlurView>
        </Box>
    )
}
