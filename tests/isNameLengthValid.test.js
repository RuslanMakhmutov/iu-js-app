import { isNameLengthValid } from '../src/isNameLengthValid'

describe('Проверка корректной работы валидации длины имени', () => {
    test('Имя короче 5 символов выдает ошибку', () => {
        expect(isNameLengthValid('вася')).toEqual({valid: false, message: 'Имя не должно быть короче 5 символов'})
    })

    test('Имя 5 и более символов выдает успех', () => {
        expect(isNameLengthValid('марат')).toEqual({valid: true, message: ''})
    })

    describe('Нестроковые типы вызывают ошибку', () => {
        const nameWringTypes = [true, ['Марат'], {name: 'Марат'}, 12345]
        test.each(nameWringTypes)("Неверный тип - '%p'", (singleType) => {
            function checkThrow() {
                isNameLengthValid(singleType)
            }
            expect(checkThrow).toThrow('Некорректное значение имени')
        })
    });
});
