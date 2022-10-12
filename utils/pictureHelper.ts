import * as ImagePicker from 'expo-image-picker'

export const openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        base64: true
    })
    return pickerResult
}

export const openImageByCameraAsync = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
        base64: true
    })
    return pickerResult
}