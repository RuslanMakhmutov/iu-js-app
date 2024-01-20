// 1
const prices = [100, 150, 200, 250]
const pricesWithCurrency = prices.map((price) => `${price} р`)
console.log('массив цен со знаком рубля:', pricesWithCurrency)
console.log()

// 2
const users = [
    ['alex', 32],
    ['tomas', 17],
    ['olga', 14],
    ['andre', 24]
]

const usersAdult = users.filter((user) => user[1] >= 18)
console.log('массив совершеннолетних пользователей:', usersAdult)
console.log()

// 3
const goods = [
    { title: 'пицца', price: 200 },
    { title: 'баранина', price: 300 },
    { title: 'креветки', price: 400 }
]

const sumGoodsPrices = goods.reduce((acc, item) => (acc += item.price), 0)
console.log('общая стоимость товаров:', sumGoodsPrices)
