console.log('--------------------------')
console.log('arrays-objects-methods.js')

// 1
const prices: number[] = [100, 150, 200, 250]
const pricesWithCurrency: string[] = prices.map((price: number): string => `${price} р`)
console.log('массив цен со знаком рубля:', pricesWithCurrency)
console.log()

// 2
type UserArray = (string | number)[]
const users: UserArray[] = [
    ['alex', 32],
    ['tomas', 17],
    ['olga', 14],
    ['andre', 24]
]

const usersAdult: UserArray[] = users.filter((user: UserArray): boolean => Number(user[1]) >= 18)
console.log('массив совершеннолетних пользователей:', usersAdult)
console.log()

// 3
interface GoodsObject { title: string, price: number }
const goods: GoodsObject[] = [
    { title: 'пицца', price: 200 },
    { title: 'баранина', price: 300 },
    { title: 'креветки', price: 400 }
]

const sumGoodsPrices: number = goods.reduce((acc: number, item: GoodsObject) => (acc += item.price), 0)
console.log('общая стоимость товаров:', sumGoodsPrices)
