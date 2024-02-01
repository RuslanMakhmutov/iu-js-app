"use strict";
const f = () => {
    console.log('--------------------------');
    console.log('scope.js');
    class ShoppingCart {
        constructor(id) {
            this.id = id;
            this.goods = [];
        }
        getGoods() {
            return this.goods;
        }
        getGoodsCount() {
            return this.goods.length;
        }
        addGood(item) {
            this.goods.push(item);
        }
        getTotalSum() {
            return this.goods.reduce((acc, good) => (acc + good.price * good.quantity), 0);
        }
        printCart() {
            const rows = this.goods.map((item) => `${item.title}: ${item.quantity} шт по ${item.price} р = ${item.quantity * item.price} р`);
            console.log(`---Корзина ${this.id}---`);
            console.log(rows.join('\r\n'));
            console.log(`---ВСЕГО позиций: ${this.getGoodsCount()} на сумму: ${this.getTotalSum()} р`);
            console.log();
        }
    }
    // новые корзины
    const cart1 = new ShoppingCart(1);
    const cart2 = new ShoppingCart(2);
    const cart3 = new ShoppingCart(3);
    const carts = [cart1, cart2, cart3];
    // добавление товаров в корзины
    cart1.addGood({ title: 'Шапка', price: 500, quantity: 3 });
    cart1.addGood({ title: 'Шарф', price: 1000, quantity: 1 });
    cart1.addGood({ title: 'Варежки', price: 600, quantity: 2 });
    cart2.addGood({ title: 'Смартфон', price: 50000, quantity: 1 });
    cart2.addGood({ title: 'Батарейка', price: 50, quantity: 10 });
    cart3.addGood({ title: 'Мыло', price: 30, quantity: 5 });
    cart3.addGood({ title: 'Шампунь', price: 200, quantity: 2 });
    cart3.addGood({ title: 'Мочалка', price: 150, quantity: 3 });
    // вывод всех корзин
    // carts.forEach(cart => { cart.printCart() })
    // сумма всех корзин
    const cartsTotalSum = carts.reduce(function (acc, cart) {
        return acc + cart.getTotalSum();
    }, 0);
    console.log(`сумма всех корзин: ${cartsTotalSum} р`);
    // корзины с количеством позиций больше двух
    const more2Carts = carts.filter((cart) => cart.getGoodsCount() > 2);
    more2Carts.forEach((cart) => { cart.printCart(); });
    const more2CartsTotalSum = more2Carts.reduce(function (acc, cart) {
        return acc + cart.getTotalSum();
    }, 0);
    console.log(`сумма корзин с количеством позиций больше двух: ${more2CartsTotalSum} р`);
    //
    //
    // счётчики через замыкания
    if (typeof document !== 'undefined') {
        const buttons = document.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++) {
            let clickCount = 0;
            const button = buttons[i];
            button.addEventListener('click', () => {
                clickCount++;
                console.log(`кнопка ${i + 1} нажата ${clickCount} раз`);
            });
        }
    }
};
f();
