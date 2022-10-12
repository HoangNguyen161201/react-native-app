import * as yup from 'yup'

export const loginForm = yup.object({
    email: yup.string().required("please, don't leave it blank").email('invalid email address'),
    password: yup.string().required("please, don't leave it blank")
}) 

export const registerForm = yup.object({
    email: yup.string().required("please, don't leave it blank").email('invalid email address'),
    password: yup.string().required("please, don't leave it blank").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i, 'Password must have at least 1 uppercase character, 1 special character, 1 number and the length must be more than 8 characters'),
    confirmPassword: yup.string().required("please, don't leave it blank").oneOf([yup.ref('password'), null], 'Passwords must match')
}) 

export const addTripForm = yup.object({
    name: yup.string().required("please, don't leave it blank"),
    destination: yup.string().required("please, don't leave it blank")
}) 

