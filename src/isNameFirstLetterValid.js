export const isNameFirstLetterValid = (name) => {
    if (typeof name !== 'string' || name.length < 1) {
        throw new Error('Некорректное значение имени')
    }

    if (name[0] !== name[0].toUpperCase()) {
        return {valid: false, message: 'Первая буква имени должна быть заглавной'}
    }
    return {valid: true, message: ''}
}