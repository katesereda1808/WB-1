"use strict"
let total = document.querySelector('.summary__price_value');
const pay_btn = document.querySelector('.order_btn');
const pay_now__checkbox = document.querySelector("#pay_now");
const in_the_cart_goods = document.querySelector('.in_the_cart_goods').children;
let totalSum = null;

const goodsInCartArr = [
    {
        id: 1,
        img: "./assets/images/good-1.png",
        price: 522,
        old_price: 1051,
        title: "Футболка UZcotton мужская",
        color: "Цвет: белый",
        size: "Размер: 56",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Вайлдберриз",
        quantity: 1,
        left_in_stock: "Осталось 2 шт.",
        price_total: null

    },
    {
        id: 2,
        img: "./assets/images/good-2.png",
        price: 10500.23,
        old_price: 11500.24,
        title: "Футболка UZcotton мужская",
        color: "Цвет: белый",
        size: "Размер: 56",
        seller_name: "Коледино WB",
        seller_legal_name: "OOO Вайлдберриз",
        quantity: 200,
        left_in_stock: ""

    },
    
]
function loadGoods (goodsArr){
    const goodsContainer = document.querySelector(".in_the_cart_goods")
    goodsContainer.innerHTML = ''
    

    goodsArr.map((goodItem)=>{
        const goodLayout = document.createElement("div")
        goodLayout.className = "good"
        goodLayout.innerHTML = `
        <div class="good__info">
            <label class="good__checkbox checkbox_container">
                <input type="checkbox" name="${goodItem.id}" id="${goodItem.id}" class="checkbox" data-price="${goodItem.price}">
                <span class="custom_checkbox"></span>
            </label>
            <div class="good__img">
                <img src=${goodItem.img} alt="">
            </div>
            <div class="good__details">
                <div class="good__price mobile">
                    <div class="price">
                        <span class="price_sum">
                        ${goodItem.price}
                        </span> 
                        <span class="price_cur">сом</span>
                    </div>
                    <div class="old_price">
                    ${goodItem.old_price} сом
                    </div>
                </div>
                <p class="good__title">
                    ${goodItem.title}
                </p>
                <div class="good__parameters">
                    <p class="good__color">
                    ${goodItem.color}
                    </p>
                    <p class="good__size">
                    ${goodItem.size}
                    </p>
                </div>
                <div class="good__seller">
                    <p class="good__seller_name">${goodItem.seller_name}</p>
                        <div class="good__seller_legal_name desktop">
                        ${goodItem.seller_legal_name}
                            <img src="./assets/icons/icon-20.svg" alt="">
                        </div>
                </div>
            </div>
        </div>
        <div class="good__order">
            <div class="good__quantity">
                <div class="good__added">
                    <div class="counter">
                        <div class="counter__decrease">
                            -
                        </div>
                        <input class="counter__quantity" value= "${goodItem.quantity}" pattern="^[1-9]\d*$"/>
                        <div class="counter__increase">
                            +
                        </div>
                    </div>
                </div>
                <div class="good__in_stock">
                ${goodItem.left_in_stock}
                </div>
                <div class="good__action">
                    <div class="add_to_favorites">
                        <img src="./assets/icons/heart.svg" alt="">
                    </div>
                    <div class="remove">
                        <img src="./assets/icons/trash.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="good__price desktop">
                <div class="price">
                    <span class="price_sum">
                    ${goodItem.price}
                    </span> 
                    <span class="price_cur">сом</span>
                </div>
                <div class="old_price">
                ${goodItem.old_price}
                </div>
            </div>
        </div>`;
        goodsContainer.appendChild(goodLayout);

        // show total price of the goods of this type
        multiplyGoodsPrice (goodItem, goodLayout)

        // add event listeners to counter
        animateCounter(goodItem, goodLayout);

        // count total sum
        totalSum = countTotalGoodsSum(goodItem, totalSum)
    })
    // console.log(totalSum)
    total.innerText = totalSum;
}


// срабатывает только 1 раз при первичной загрузке страницы
function countTotalGoodsSum(goodItem, totalSum) {

    goodItem.price_total?
    totalSum+=goodItem.price_total:
    totalSum+=goodItem.price
    return totalSum
}

loadGoods(goodsInCartArr)

function animateCounter(goodObject, goodLayout) {
    
    // то, к чему привязываем слушатели событий
    let increase = goodLayout.querySelector(".counter__increase");
    let decrease = goodLayout.querySelector(".counter__decrease");
    let counter_input = goodLayout.querySelector(".counter__quantity");

    let quantity = goodObject.quantity;


    increase.addEventListener("click", () => {
        goodObject.quantity = ++quantity;

        counter_input.value = quantity

        // функция умножения цены на количество товара
        multiplyGoodsPrice (goodObject, goodLayout)

        // функция уВЕличения общей цены корзины при увеличении колич товара
        totalSum = Math.ceil(totalSum + goodObject.price)
        total.innerText = totalSum;

        // менять текст в кнопке при изменении суммы
        payNow() 
     
    })
    decrease.addEventListener("click", () => {
        if (quantity > 1){
            
            goodObject.quantity = --quantity;

            counter_input.value = quantity;

            // функция умножения цены на количество товара
            multiplyGoodsPrice (goodObject, goodLayout)
      
            // функция уМЕньшения общей цены корзины при уменьшении колич товара
            totalSum = Math.ceil(totalSum - goodObject.price)
            total.innerText = totalSum;

            // менять текст в кнопке при изменении суммы
            payNow() 

        }
    })
    

    // counter_input.addEventListener('input', changeQuantity('input', goodObject, goodLayout)
    counter_input.addEventListener('input', 
    ()=>{
        // работает, но нужно добавить 0
        counter_input.value = counter_input.value.replace(/[^\d]/g, '');

        goodObject.quantity = counter_input.value;

        multiplyGoodsPrice (goodObject, goodLayout)

        countTotalSum(goodsInCartArr);

        payNow() 
    }
    )
}

// общая функция для всех событий
function changeQuantity(operation, goodObject, goodLayout){
    let quantity = goodObject.quantity;
    let counter_input = goodLayout.querySelector(".counter__quantity");


    if (operation === 'input'){
        // работает, но нужно добавить 0
        counter_input.value = counter_input.value.replace(/[^\d]/g, '');
        goodObject.quantity = counter_input.value;
    }
    if(operation === 'increase'){
        goodObject.quantity = ++quantity;
        counter_input.value = quantity;
    } else {
        goodObject.quantity = --quantity;
        counter_input.value = quantity;
    }
    // общее для всех
    multiplyGoodsPrice (goodObject, goodLayout)
    if (operation === 'input'){
        countTotalSum(goodsInCartArr);
    }
    if(operation === 'increase'){
        totalSum = Math.ceil(totalSum + goodObject.price);
        total.innerText = totalSum;
    } else {
        totalSum = Math.ceil(totalSum - goodObject.price);
        total.innerText = totalSum;
    }
    // общее для всех
    payNow() 
}

function countTotalSum(goods) {
    let prices = extractGoodsSums(goods);
    let commonSum = countSum(prices);
    totalSum = commonSum;
    console.log(totalSum)
    total.innerText = totalSum;
}

function extractGoodsSums(goods) {
  
    let sums = [];
    for (let i = 0; i < goods.length; i++) {
        let sum;
        /// c 0 не работает
        // либо исключаем возможность написания 0
        // либо включаем возможность 0
        // первое кажется логичнее
        goods[i].price_total?
        sum = goods[i].price_total:
        sum=goods[i].price
        sums.push(sum)
    }
    console.log(sums)
    return sums
}
function countSum(nums) {
    let result = nums.reduce(function (sum, num) {
        return sum + num;
    }, 0);
    return result
}

// check quantity and multiply by price
function multiplyGoodsPrice (goodObject, goodLayout) {
    let quantity = goodObject.quantity;
    let price = goodObject.price;
    let sum = goodObject.price_total;
    sum = Math.ceil(quantity*price);
    goodObject.price_total = sum
    let prices = goodLayout.querySelectorAll('.price_sum')
    for (const price of prices) {
        price.innerText = sum
    }
}

pay_now__checkbox.addEventListener("click", payNow)
function payNow() {
    if (pay_now__checkbox.checked) {
        pay_btn.innerText = `Оплатить ${totalSum}`
    } else {
        pay_btn.innerText = `Заказать`
    }
}

