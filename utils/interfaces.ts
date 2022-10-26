import { ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"

export interface AdvancedSearch {
    name: string
    destination: string
    startDate: string
    endDate: string
}

export interface DialogSearch {
    isOpen: boolean
    setIsOpen: any
    handle: any
    form: any
}

export interface Alert {
    message: string
    type: "error" | "success"
}

export interface AlertDialog {
    isOpen: boolean
    setIsOpen: any
    handle: any
    title: string
    description: string
}

export interface Address {
    address: string,
}

export type TType = 'Travel' | 'Food' | 'Other'

export interface Expense {
    id: string | number[]
    date: string
    time: string
    comment: string
    amount?: number
    type: TType
    idTrip: string | number[]
    address: string
}

export interface Trip {
    id: string | number[]
    name: string
    description: string
    destination: string
    isRisk: boolean
    img: string
    date: string
    predictedAmount: number
    memberCount: number
}

export interface ConfirmData {
    data?: Trip
    isOpen: boolean
    setIsOpen: any
    handle: any
    setLoading?: any
}

export interface User {
    email: string
    password?: string
    name?: string
    job?: string
    address?: string
    phone?: string
    facebook?: string
    id?: string
    avatar?: string
}

export interface DialogGetPicture {
    openGetPicture: boolean
    setOpenGetPicture: any
    setImg: any
}

export interface Feature {
    bg: string
    title: string
    handle: any
    iconName: any
}

export interface Input {
    name: string
    iconName: string
    placeholder: string
    required?: boolean
    form: UseFormReturn<any, any>
    label: string
    disable?: boolean
    handle?: any
    flex?: number
    type?: "text" | "password"
    match?: string
    [index: string]: any
}

export interface Select {
    name: string
    required?: boolean
    form: UseFormReturn<any, any>
    label: string
    options: Array<TType>
    flex?: number
}

export interface Switch {
    name: string
    required?: boolean
    form: UseFormReturn<any, any>
    label: string
    value?: boolean
}

export interface Layout {

    children: ReactNode
    navigation: any
    bg?: string
    color?: string
    isEmpty?: boolean
    nameRedirect?: string

}

export interface DialogAddExpense {
    isOpen: boolean
    form: UseFormReturn<any, any>
    setIsOpen: any
    submit: any
}