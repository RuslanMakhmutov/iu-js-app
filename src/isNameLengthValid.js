export const isNameLengthValid = (name) => {
    if (typeof name !== 'string') {
        throw new Error('Некорректное значение имени')
    }

    if (name.length < 5 ) {
        return {valid: false, message: 'Имя не должно быть короче 5 символов'}
    }
    return {valid: true, message: ''}
}