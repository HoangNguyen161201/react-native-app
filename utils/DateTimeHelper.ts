import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"

interface ISetDateOrTime {
    mode: 'date' | 'time'
    form: any
    nameField: string
}

export const setDateOrTime = ({mode, form, nameField}: ISetDateOrTime)=> {
    DateTimePickerAndroid.open({
        mode,
        value: new Date(),
        onChange: (_, date) => {
            if (date)
                form.setValue(
                    nameField,
                    mode == 'date' ? date.toLocaleDateString() : `${date.getHours()}:${date.getMinutes()}`
                )
        },
    })
}
