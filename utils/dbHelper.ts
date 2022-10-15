import { FirebaseError, initializeApp } from 'firebase/app'
import { getDatabase, ref, remove, set } from 'firebase/database'
import { IExpense } from '../features/expenseSlice'
import { Trip } from '../features/tripSlice'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, connectAuthEmulator } from 'firebase/auth'
import {
    FIREBASE_APP_ID,
    FIREBASE_DOMAIN,
    FIREBASE_KEY,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET } from '../env'

export interface IResultAuth {
    message: string
    success: boolean
}

const firebaseConfig = {
    apiKey: "AIzaSyDA3UTHx_OQc1pyoFR9ebBOJPLXKdm8xxU",
    authDomain: "react-app-b1bf3.firebaseapp.com",
    projectId: "react-app-b1bf3",
    storageBucket: "react-app-b1bf3.appspot.com",
    messagingSenderId: "143432247639",
    appId: "1:143432247639:web:9669f7cc24c72636c83612",
    measurementId: "G-F36P5K7WNC"
}

let myApp = initializeApp(firebaseConfig)

// auth
export const auth = getAuth(myApp)


export const handleAuth = async ({ user: { email, password }, type}: {
    user: {
        email: string
        password: string
    }, type: 'login' | 'register'
}): Promise<IResultAuth> => {
    switch (type) {
        case 'login':
            return await signInWithEmailAndPassword(auth, email, password).then(() => {
                return {
                    message: 'Login successfully',
                    success: true
                }
            }).catch((e) => {
                console.log(e)
                return {
                    message: 'Wrong email or password',
                    success: false
                }
            })
        case 'register':
            return await createUserWithEmailAndPassword(auth, email, password).then(() => {
                return {
                    message: 'Sign up successfully',
                    success: true
                }
            }).catch((e) => {
                console.log(e)
                return {
                    message: 'System is error',
                    success: false
                }
            })
        default:
            return {
                message: 'Email already in use',
                success: false
            }
    }



}

// action with db
const db = getDatabase(myApp)

export const backUp = ({ trips, expenses, user }: {
    trips: Array<Trip>
    expenses: Array<IExpense>
    user: any
}) => {
    //Clear data on firebase
    remove(ref(db, "trips"))
    remove(ref(db, "expenses"))
    remove(ref(db, "user"))

    //Backup data to firebase
    set(ref(db, "Trip"), trips)
    set(ref(db, "Expense"), expenses)
    set(ref(db, "User"), user)
}
