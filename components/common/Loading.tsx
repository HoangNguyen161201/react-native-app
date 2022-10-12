import { BlurView } from "expo-blur"
import React from "react"
import LottieView from "lottie-react-native"

export const Loading = () => {
    return (
        <BlurView
            style={{
                top: 0,
                left: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
            intensity={60}
            tint="light"
        >
            <LottieView
                style={{
                    opacity: 0.8,
                }}
                source={require("../../assets/load.json")}
                autoPlay
                loop
            />
        </BlurView>
    )
}
