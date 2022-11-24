"use strict"
let total = document.querySelector('.summary__price').innerText;
const pay_btn = document.querySelector('.order_btn');
const pay_now__checkbox = document.querySelector("#pay_now");
const in_the_cart_goods = document.querySelector('.in_the_cart_goods').children;
console.log(in_the_cart_goods[0])

class Goood {
    constructor(increase, decrease, quantity, price, pricesDisplay) {
        // this.increase = this.querySelector(".counter__increase");
        // this.decrease = this.querySelector(".counter__decrease");
        // this.quantity = this.querySelector(".counter__quantity");
        this.price = this.dataset.price
        // this.pricesDisplay = this.querySelectorAll('.price_sum')
    }
    //add event listeners to increase and decrease
    animateCounter() {
        let numberOfGoods = quantity.innerText;
        increase.addEventListener("click", () => {
            quantity.innerText = ++numberOfGoods
            this.multiplyGoodsPrice()
        })
        decrease.addEventListener("click", () => {
            if (+numberOfGoods > 1) {
                quantity.innerText = --numberOfGoods
                this.multiplyGoodsPrice()
            }
            // если количество равно 0 и пользователь нажал - , то идет удаление товара?

        })
    }

    // check quantity and multiply by price
    multiplyGoodsPrice() {
        let sum = quantity * this.price;
        // console.log(good.querySelectorAll('.price_sum'))
        // let prices = this.querySelectorAll('.price_sum')
        for (const price of this.pricesDisplay) {
            price.innerText = sum
        }
    }
}

const firstGood = new Goood(in_the_cart_goods[0]);











pay_now__checkbox.addEventListener("click", payNow)

function payNow() {
    if (pay_now__checkbox.checked) {
        pay_btn.innerText = `Оплатить ${total}`
    } else {
        pay_btn.innerText = `Заказать`
    }
}
function extractGoodsPrices(goods) {
    let prices = [];
    for (let i = 0; i < goods.length; i++) {
        let price = goods[i].dataset.price
        prices.push(+price)
    }
    console.log(prices)
    return prices
}

function countSum(nums) {
    let result = nums.reduce(function (sum, num) {
        return sum + num;
    }, 0);
    console.log(result)
    return result
}

const pricesArr = extractGoodsPrices(in_the_cart_goods)

document.querySelector('.summary__price').innerText = countSum(pricesArr) + ' сом'







// function processGoods(goods) {
//     for (let i = 0; i < goods.length; i++) {
//         const goodsItem = goods[i];
//         countGoodsQuantity(goodsItem);
//     }
// }
// processGoods(in_the_cart_goods)
//////
// countGoodsQuantity(in_the_cart_goods)