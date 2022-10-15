import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import Icon from "react-native-vector-icons/Ionicons"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { CustomDrawer } from "./components/common"
import {
    AddTripScreen,
    ContactScreen,
    DetailScreen, HomeScreen, IntroScreen,
    LoginScreen,
    ProfileScreen,
    RegisterScreen,
    TripScreen,
    UpdateTripScreen
} from "./screens"

const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Drawer.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: "#D2DAFF",
                            },
                            drawerActiveBackgroundColor: "#D2DAFF",
                            drawerActiveTintColor: "#6667C3",
                            drawerLabelStyle: {
                                marginLeft: -15,
                                fontSize: 16
                            },
                            headerShown: false,
                        }}
                        drawerContent={(props) => <CustomDrawer {...props} />}
                        initialRouteName="Intro"
                    >
                        <Drawer.Screen
                            options={{
                                drawerIcon: ({ color }) => (
                                    <Icon
                                        color={color}
                                        size={20}
                                        name="person-outline"
                                    ></Icon>
                                ),
                            }}
                            name="Profile"
                            component={ProfileScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerIcon: ({ color }) => (
                                    <Icon
                                        color={color}
                                        size={20}
                                        name="home-outline"
                                    ></Icon>
                                ),
                            }}
                            name="Home"
                            component={HomeScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerIcon: ({ color }) => (
                                    <Icon
                                        color={color}
                                        size={20}
                                        name="golf-outline"
                                    ></Icon>
                                ),
                            }}
                            name="Trips"
                            component={TripScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerIcon: ({ color }) => (
                                    <Icon
                                        color={color}
                                        size={20}
                                        name="add-outline"
                                    ></Icon>
                                ),
                            }}
                            name="Add new"
                            component={AddTripScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerItemStyle: {
                                    display: "none",
                                },
                            }}
                            name="Detail"
                            component={DetailScreen}
                        />
                        <Drawer.Screen
                            options={{
                                drawerItemStyle: {
                                    display: "none",
                                },
                            }}
                            name="Update"
                            component={UpdateTripScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerItemStyle: {
                                    display: "none",
                                },
                            }}
                            name="Intro"
                            component={IntroScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerItemStyle: {
                                    display: "none",
                                },
                            }}
                            name="Login"
                            component={LoginScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerItemStyle: {
                                    display: "none",
                                },
                            }}
                            name="Register"
                            component={RegisterScreen}
                        />

                        <Drawer.Screen
                            options={{
                                drawerIcon: ({ color }) => (
                                    <Icon
                                        color={color}
                                        size={20}
                                        name="call-outline"
                                    ></Icon>
                                ),
                            }}
                            name="Contact"
                            component={ContactScreen}
                        />
                    </Drawer.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}
