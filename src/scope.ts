const f = (): void => {
    console.log('--------------------------')
    console.log('scope.js')
    interface GoodsObject {
        title: string
        price: number
        quantity: number
    }
    class ShoppingCart {
        readonly id: number
        protected goods: GoodsObject[]

        constructor (id: number) {
            this.id = id
            this.goods = []
        }

        getGoods (): GoodsObject[] {
            return this.goods
        }

        getGoodsCount (): number {
            return this.goods.length
        }

        addGood (item: GoodsObject): void {
            this.goods.push(item)
        }

        getTotalSum (): number {
            return this.goods.reduce((acc: number, good: GoodsObject) => (acc + good.price * good.quantity), 0)
        }

        printCart (): void {
            const rows: string[] = this.goods.map((item: GoodsObject): string => `${item.title}: ${item.quantity} шт по ${item.price} р = ${item.quantity * item.price} р`)
            console.log(`---Корзина ${this.id}---`)
            console.log(rows.join('\r\n'))
            console.log(`---ВСЕГО позиций: ${this.getGoodsCount()} на сумму: ${this.getTotalSum()} р`)
            console.log()
        }
    }

    // новые корзины
    const cart1: ShoppingCart = new ShoppingCart(1)
    const cart2: ShoppingCart = new ShoppingCart(2)
    const cart3: ShoppingCart = new ShoppingCart(3)

    const carts: ShoppingCart[] = [cart1, cart2, cart3]

    // добавление товаров в корзины
    cart1.addGood({ title: 'Шапка', price: 500, quantity: 3 })
    cart1.addGood({ title: 'Шарф', price: 1000, quantity: 1 })
    cart1.addGood({ title: 'Варежки', price: 600, quantity: 2 })

    cart2.addGood({ title: 'Смартфон', price: 50000, quantity: 1 })
    cart2.addGood({ title: 'Батарейка', price: 50, quantity: 10 })

    cart3.addGood({ title: 'Мыло', price: 30, quantity: 5 })
    cart3.addGood({ title: 'Шампунь', price: 200, quantity: 2 })
    cart3.addGood({ title: 'Мочалка', price: 150, quantity: 3 })

    // вывод всех корзин
    // carts.forEach(cart => { cart.printCart() })

    // сумма всех корзин
    const cartsTotalSum: number = carts.reduce(function (acc: number, cart: ShoppingCart) {
        return acc + cart.getTotalSum()
    }, 0)
    console.log(`сумма всех корзин: ${cartsTotalSum} р`)

    // корзины с количеством позиций больше двух
    const more2Carts: ShoppingCart[] = carts.filter((cart: ShoppingCart): boolean => cart.getGoodsCount() > 2)
    more2Carts.forEach((cart: ShoppingCart): void => { cart.printCart() })
    const more2CartsTotalSum: number = more2Carts.reduce(function (acc: number, cart: ShoppingCart) {
        return acc + cart.getTotalSum()
    }, 0)
    console.log(`сумма корзин с количеством позиций больше двух: ${more2CartsTotalSum} р`)

    //
    //
    // счётчики через замыкания
    if (typeof document !== 'undefined') {
        const buttons = document.querySelectorAll('button')
        for (let i: number = 0; i < buttons.length; i++) {
            let clickCount: number = 0
            const button = buttons[i]

            button.addEventListener('click', () => {
                clickCount++
                console.log(`кнопка ${i + 1} нажата ${clickCount} раз`)
            })
        }
    }
}
f()
