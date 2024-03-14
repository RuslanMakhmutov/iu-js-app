import { isNameFirstLetterValid } from '../src/isNameFirstLetterValid'

describe('Проверка корректной работы валидации первой буквы имени', () => {
    test('Первая буква в нижнем регистре выдаёт ошибку', () => {
        expect(isNameFirstLetterValid('марат')).toEqual({valid: false, message: 'Первая буква имени должна быть заглавной'})
    })

    test('Первая буква в верхнем регистре выдаёт успех', () => {
        expect(isNameFirstLetterValid('Марат')).toEqual({valid: true, message: ''})
    })

    describe('Нестроковые типы или пустая строка вызывают ошибку', () => {
        const nameWringTypes = [true, ['Марат'], {name: 'Марат'}, 12345, '']
        test.each(nameWringTypes)("Неверный тип - '%p'", (singleType) => {
            function checkThrow() {
                isNameFirstLetterValid(singleType)
            }
            expect(checkThrow).toThrow('Некорректное значение имени')
        })
    });
});
