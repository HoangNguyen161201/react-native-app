import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth"
import { get, getDatabase, ref, remove, set } from "firebase/database"
import {
    FIREBASE_APP_ID,
    FIREBASE_DOMAIN,
    FIREBASE_KEY,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
} from "../env"
import { IExpense } from "../features/expenseSlice"
import { Trip } from "../features/tripSlice"

export interface IResultAuth {
    message: string
    success: boolean
    account?: User
}

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
}

let myApp = initializeApp(firebaseConfig)

// auth
export const auth = getAuth(myApp)

export const handleAuth = async ({
    user: { email, password },
    type,
}: {
    user: {
        email: string
        password: string
    }
    type: "login" | "register"
}): Promise<IResultAuth> => {
    switch (type) {
        case "login":
            return await signInWithEmailAndPassword(auth, email, password)
                .then((e) => {
                    return {
                        message: "Login successfully",
                        success: true,
                        account: e.user,
                    }
                })
                .catch((e) => {
                    return {
                        message: "Wrong email or password",
                        success: false,
                    }
                })
        case "register":
            return await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    return {
                        message: "Sign up successfully",
                        success: true,
                    }
                })
                .catch((e) => {
                    return {
                        message: "Email already exists",
                        success: false,
                    }
                })
        default:
            return {
                message: "Email already in use",
                success: false,
            }
    }
}

// action with db
const db = getDatabase(myApp)

//Back up data
export const BackUpData = async () => {
    const trips = await AsyncStorage.getItem("trips")
    const expenses = await AsyncStorage.getItem("expenses")
    const user = await AsyncStorage.getItem("user")

    remove(ref(db, "Users/" + auth.currentUser?.uid))

    await set(
        ref(db, "Users/" + auth.currentUser?.uid + "/Info"),
        user ? JSON.parse(user) : {}
    )

    await set(
        ref(db, "Users/" + auth.currentUser?.uid + "/Trips"),
        trips ? JSON.parse(trips) : []
    )
    await set(
        ref(db, "Users/" + auth.currentUser?.uid + "/Expenses"),
        expenses ? JSON.parse(expenses) : []
    )
}

export const restoreData = async () => {
    const trips = await get(
        ref(db, "Users/" + auth.currentUser?.uid + "/Trips")
    )
    const expenses = await get(
        ref(db, "Users/" + auth.currentUser?.uid + "/Expenses")
    )
    const userInfo = await get(
        ref(db, "Users/" + auth.currentUser?.uid + "/Info")
    )

    let tripsArr: any[] = []
    let expensesArr: any[] = []

    if (trips) {
        trips.forEach((item) => {
            tripsArr.push(item)
        })
    }

    if (expenses) {
        expenses.forEach((item) => {
            expensesArr.push(item)
        })
    }

    console.log(userInfo, "huy")
    //Set data to local
    if (userInfo) {
        await AsyncStorage.setItem("user", JSON.stringify(userInfo))
    }
    await AsyncStorage.setItem("trips", JSON.stringify(tripsArr))
    await AsyncStorage.setItem("expenses", JSON.stringify(expensesArr))
}
